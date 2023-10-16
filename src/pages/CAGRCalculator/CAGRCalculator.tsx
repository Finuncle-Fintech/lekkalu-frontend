import React, { useMemo, useState } from 'react'
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
import { Form } from '@/components/ui/form'
import { cagrCalculatorSchema } from '@/schema/calculators'
import { parseQueryString } from '@/utils/query-string'
import { calculateCagr } from '@/utils/calculators'
import { handleShare } from '@/utils/clipboard'
import When from '@/components/When/When'
import { CustomLabelPie } from '@/components/shared/CustomLabelPie/CustomLabelPie'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'

type CagrValues = z.infer<typeof cagrCalculatorSchema>

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

  const inputs: Array<InputField> = [
    {
      id: 'initialValue',
      label: `Initial value (${preferences?.currencyUnit})`,
      type: 'number',
      hasRange: true,
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
      hasRange: true,
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
      hasRange: true,
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

  const result = useMemo(() => {
    if (!values.durationOfInvestment || !values.finalValue || !values.initialValue) {
      return undefined
    }

    const summary = calculateCagr(values.initialValue, values.finalValue, values.durationOfInvestment)
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

    return { summary, pieChartData, barChartData: summary.barChartData }
  }, [values.durationOfInvestment, values.finalValue, values.initialValue])

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
              <InputFieldsRenderer control={form.control} inputs={inputs} />
            </form>
          </Form>
        </div>

        <When truthy={typeof result !== 'undefined'}>
          <div>
            <div className='text-xl text-center'>Summary</div>
            <div className='w-full p-4 flex flex-col gap-4 items-center'>
              <PieChart width={400} height={200}>
                <Pie dataKey='value' data={result?.pieChartData} outerRadius={80} labelLine={false}>
                  {result?.pieChartData.map((entry, index) => (
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
                  data={result?.barChartData}
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
                  {result?.summary?.absoluteReturns} {preferences.currencyUnit}
                </div>
              </div>
              <div className='flex gap-2 border-b'>
                <div>You absolute CAGR: </div>
                <div className='font-medium'>
                  {result?.summary?.absoluteCAGR} {preferences.currencyUnit}
                </div>
              </div>
              <div className='flex gap-2 border-b'>
                <div>You CAGR percentage: </div>
                <div className='font-medium'>{result?.summary?.percentageCAGR} %</div>
              </div>
            </div>
          </div>
        </When>
      </div>
    </section>
  )
}
