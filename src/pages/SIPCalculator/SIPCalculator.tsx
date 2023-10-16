import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts'
import { Button } from '@/components/ui/button'
import { parseQueryString } from '@/utils/query-string'
import { Input } from '@/components/ui/input'
import { sipCalculatorSchema } from '@/schema/calculators'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import { calculateSip } from '@/utils/calculators'
import { CustomLabelPie } from '@/components/shared/CustomLabelPie/CustomLabelPie'
import When from '@/components/When/When'
import { useToast } from '@/components/ui/use-toast'
import { handleShare } from '@/utils/clipboard'
import { useUserPreferences } from '@/hooks/use-user-preferences'

const DEFAULT_DATA = {
  monthlyAmount: 500,
  durationInvestment: 1,
  rateReturn: 1,
}

type SipSummary = {
  finalValue: number
  totalInvested: number
  wealthGained: number
}

export default function SIPCalculator() {
  const location = useLocation()
  const parsedObject = parseQueryString(location.search)
  const [summary, setSummary] = useState<SipSummary | undefined>(undefined)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()
  const { preferences } = useUserPreferences()

  const form = useForm({
    resolver: zodResolver(sipCalculatorSchema),
    defaultValues: !isEmpty(parsedObject) ? parsedObject : DEFAULT_DATA,
  })
  const values = form.watch() as Record<string, number>

  const inputs = [
    {
      id: 'monthlyAmount',
      label: `Monthly investment amount ${preferences.currencyUnit}`,
      type: 'number',
      range: {
        min: 500,
        max: 100_000,
        step: 500,
      },
    },
    {
      id: 'durationInvestment',
      label: 'Duration of the investment (Yr)',
      type: 'number',
      range: {
        min: 1,
        max: 40,
        step: 1,
      },
    },
    {
      id: 'rateReturn',
      label: 'Expected annual return (%)',
      type: 'number',
      range: {
        min: 1,
        max: 30,
        step: 0.1,
      },
    },
  ]

  const calculateFinalSip = useCallback(() => {
    const results = calculateSip(values.monthlyAmount, values.durationInvestment, values.rateReturn)
    setSummary(results)
  }, [values.durationInvestment, values.monthlyAmount, values.rateReturn])

  useEffect(() => {
    calculateFinalSip()
  }, [form, calculateFinalSip])

  const pieData = useMemo(() => {
    if (!summary) {
      return []
    }

    return [
      { name: 'Total Invested', value: summary.totalInvested },
      { name: 'Wealth Gained', value: summary.wealthGained },
    ]
  }, [summary])

  const handleCopy = () => {
    setIsCopied(true)
    handleShare(values)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <div className='max-w-screen-xl mx-auto p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => {
            toast({
              title: 'Feature under development!',
              description: 'The feature you are trying to use is under development!',
            })
          }}
        >
          Save
        </Button>
        <Button onClick={handleCopy}>{isCopied ? 'Copied!' : 'Share'}</Button>
      </div>

      <div className='flex flex-col gap-4 items-center'>
        <div className='space-y-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>SIP Calculator</h2>
            <p>Calculate returns on your SIP investments.</p>
          </div>

          <Form {...form}>
            <form className='grid gap-4'>
              {inputs.map((input) => (
                <FormField
                  key={input.id}
                  control={form.control}
                  name={input.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                        <div className='space-y-2'>
                          <Input placeholder={input.label} {...field} />
                          <Slider
                            min={input.range.min}
                            max={input.range.max}
                            step={input.range.step}
                            onValueChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </div>

        <When truthy={typeof summary !== 'undefined'}>
          <div>
            <div className='text-xl text-center'>Summary</div>

            <div className='w-full p-4 flex flex-col gap-4 items-center'>
              <div className='flex gap-2 border-b'>
                <div>Total invested: </div>
                <div className='font-medium'>
                  {summary?.totalInvested} {preferences.currencyUnit}
                </div>
              </div>
              <div className='flex gap-2 border-b'>
                <div>Final value: </div>
                <div className='font-medium'>
                  {summary?.finalValue} {preferences.currencyUnit}
                </div>
              </div>
              <div className='flex gap-2 border-b'>
                <div>Wealth gained: </div>
                <div className='font-medium'>
                  {summary?.wealthGained} {preferences.currencyUnit}
                </div>
              </div>

              <PieChart width={200} height={220}>
                <Pie dataKey='value' data={pieData} outerRadius={80} labelLine={false}>
                  {pieData.map((item, index) => (
                    <Cell key={index} fill={item.name.includes('Total Invested') ? '#099fea' : '#09ea49'} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip content={<CustomLabelPie />} />
              </PieChart>
            </div>
          </div>
        </When>
      </div>
    </div>
  )
}
