import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import { useLocation } from 'react-router'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cagrCalculatorSchema } from '@/schema/calculators'
import { parseQueryString } from '@/utils/query-string'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { calculateCagr } from '@/utils/calculators'
import { handleShare } from '@/utils/clipboard'
import When from '@/components/When/When'
import { CustomLabelPie } from '@/components/shared/CustomLabelPie/CustomLabelPie'

type CagrValues = z.infer<typeof cagrCalculatorSchema>

type CagrSummary = {
  absoluteCAGR: string
  absoluteReturns: string
  percentageCAGR: string
  durationOfInvestment: number
  barChartData: {
    name: string
    value: number
  }[]
}

const DEFAULT_DATA = {
  initialValue: 5000,
  finalValue: 25000,
  durationOfInvestment: 5,
}

export default function CAGRCalculator() {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)
  const { preferences } = useUserPreferences()
  const location = useLocation()
  const parsedObject = parseQueryString(location.search)

  const form = useForm<CagrValues>({
    resolver: zodResolver(cagrCalculatorSchema),
    defaultValues: !isEmpty(parsedObject) ? parsedObject : DEFAULT_DATA,
  })
  const values = form.watch()

  const [summary, setSummary] = useState<CagrSummary | undefined>(undefined)

  const inputs: Array<{
    id: keyof CagrValues
    label: string
    type: string
    range: { min: number; max: number; step: number }
  }> = [
    {
      id: 'initialValue',
      label: `Initial value (${preferences?.currencyUnit})`,
      type: 'number',
      range: {
        min: 1000,
        max: 100_000_00,
        step: 500,
      },
    },
    {
      id: 'finalValue',
      label: `Final Value Costs (${preferences?.currencyUnit})`,
      type: 'number',
      range: {
        min: 1000,
        max: 100_000_00,
        step: 500,
      },
    },
    {
      id: 'durationOfInvestment',
      label: 'Duration of Investment (Years)',
      type: 'number',
      range: {
        min: 1,
        max: 40,
        step: 1,
      },
    },
  ]

  const handleCopy = () => {
    setIsCopied(true)
    handleShare(values)
    setTimeout(() => setIsCopied(false), 3000)
  }

  const calculateFinalCagr = useCallback(() => {
    const results = calculateCagr(values.initialValue, values.finalValue, values.durationOfInvestment)
    setSummary(results)
  }, [values.durationOfInvestment, values.finalValue, values.initialValue])

  useEffect(() => {
    calculateFinalCagr()
  }, [calculateFinalCagr])

  const { pieChartData, barChartData } = useMemo(() => {
    if (!summary) {
      return { pieChartData: [], barChartData: [] }
    }

    const pieChartData = [
      {
        name: 'Initial Value',
        value: values.initialValue,
      },
      {
        name: 'Final Value',
        value: values.finalValue,
      },
    ]

    return { pieChartData, barChartData: summary.barChartData }
  }, [summary, values])

  return (
    <section className='max-w-screen-xl mx-auto p-4 space-y-4'>
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

      <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
        <div className='flex flex-column'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>CAGR Calculator</h2>
            <p>Calculate your Compound Annual Growth Rate</p>
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
                            defaultValue={[field.value]}
                            min={input.range.min}
                            max={input.range.max}
                            step={input.range.step}
                            onValueChange={(value) => {
                              field.onChange(value[0])
                            }}
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
              <PieChart width={400} height={200}>
                <Pie dataKey='value' data={pieChartData} outerRadius={80} labelLine={false}>
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.name.includes('Initial Value') ? colors.blue['500'] : colors.orange['500']}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomLabelPie />} />
                <Legend height={36} />
              </PieChart>

              <ResponsiveContainer width={500} height={300} className='p-4 my-5'>
                <BarChart
                  data={barChartData}
                  margin={{
                    right: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='value'
                    fill={colors.blue['500']}
                    className='border-1 border-black'
                    style={{ border: '1px solid green' }}
                  />
                </BarChart>
              </ResponsiveContainer>

              <div className='flex gap-2 border-b'>
                <div>You absolute returns: </div>
                <div className='font-medium'>
                  {summary?.absoluteReturns} {preferences.currencyUnit}
                </div>
              </div>
              <div className='flex gap-2 border-b'>
                <div>You absolute CAGR: </div>
                <div className='font-medium'>
                  {summary?.absoluteCAGR} {preferences.currencyUnit}
                </div>
              </div>
              <div className='flex gap-2 border-b'>
                <div>You CAGR percentage: </div>
                <div className='font-medium'>{summary?.percentageCAGR} %</div>
              </div>
            </div>
          </div>
        </When>
      </div>
    </section>
  )
}
