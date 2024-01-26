import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router'
import dayjs from 'dayjs'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Trash2Icon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { xirrCalculatorSchema } from '@/schema/calculators'
import { parseQueryString } from '@/utils/query-string'
import { calculateXIRR } from '@/utils/calculators'
import { Input } from '@/components/ui/input'
import { handleShare } from '@/utils/clipboard'
import DatePicker from '@/components/DatePicker/DatePicker'

type XIRRValues = z.infer<typeof xirrCalculatorSchema>

interface CashFlow {
  key: string;
  value: number;
  type: string;
  label: string;
  transactionDate: Date;
}

const DEFAULT_DATA: XIRRValues = {
  initialInvestment: 1000,
  transactionDate: new Date(),
  guess: 0.1
}

const XIRRCalculator = () => {
  const location = useLocation()
  const parsedObject = parseQueryString(location.search)
  const [isCopied, setIsCopied] = useState(false)
  const [xirrValue, setXirrValue] = useState<number>()
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([])

  const { toast } = useToast()

  const form = useForm<XIRRValues>({
    resolver: zodResolver(xirrCalculatorSchema),
    defaultValues: !isEmpty(parsedObject) ? parsedObject : DEFAULT_DATA,
  })

  const values = form.watch()

  const handleCopy = () => {
    setIsCopied(true)
    handleShare({ ...values, transactionDate: dayjs(values.transactionDate).format('YYYY-MM-DD'), cashFlows: JSON.stringify(cashFlows) })
    setTimeout(() => setIsCopied(false), 3000)
  }

  const inputs: Array<InputField> = [{
    id: 'transactionDate',
    type: 'date',
    label: 'Initial Transaction Date'
  }, {
    id: 'initialInvestment',
    type: 'number',
    label: 'Initial Investment'
  }, {
    id: 'guess',
    type: 'number',
    label: 'Guess'
  }]

  useEffect(() => {
    if (parsedObject && parsedObject.cashFlows && typeof (parsedObject.cashFlows) === 'string') {
      const decodedCashFlows = decodeURIComponent(parsedObject.cashFlows)
      const parsedCashFlows = JSON.parse(decodedCashFlows)
      setCashFlows(parsedCashFlows)
    } else {
      const tempCashFlows = []
      for (let i = 1; i < 5; i++) {
        tempCashFlows.push({
          key: 'Period' + i,
          value: (200 * i),
          type: 'number',
          label: 'Period ' + i,
          transactionDate: new Date(new Date().setFullYear(new Date().getFullYear() + i))
        })
      }
      setCashFlows(tempCashFlows)
    }
    // eslint-disable-next-line
  }, [])

  const handleAddMoreButton = () => {
    const tempCashFlows = [
      ...cashFlows,
      {
        key: 'Period' + (cashFlows.length + 1),
        value: 200 * (cashFlows.length + 1),
        type: 'number',
        label: 'Period ' + (cashFlows.length + 1),
        transactionDate: new Date(new Date().setFullYear(new Date().getFullYear() + cashFlows.length + 1))
      }
    ]
    setCashFlows(tempCashFlows)
  }

  useMemo(() => {
    const initialInvestment = (values.initialInvestment > 0) ? -(values.initialInvestment) : (values.initialInvestment)
    const finalCashflows: number[] = [(initialInvestment)]
    const finalCashFlowDates: string[] = [dayjs(values.transactionDate).format('YYYY-MM-DD')]
    const periodicCashFlows = cashFlows.map(item => {
      return Number(item.value)
    })
    const cashFlowDates = cashFlows.map(item => {
      return dayjs(item.transactionDate).format('YYYY-MM-DD')
    })
    const xirr = calculateXIRR(finalCashflows.concat(periodicCashFlows), finalCashFlowDates.concat(cashFlowDates), values.guess)
    setXirrValue(xirr)
  }, [cashFlows, values.initialInvestment, values.transactionDate, values.guess])

  const handleTextFieldChange = (e: any) => {
    const tempCashFlows = cashFlows.map(item => {
      if (item.key === e.target.id) {
        return { ...item, value: e.target.value }
      }
      return item
    })
    setCashFlows(tempCashFlows)
  }

  const handlePeriodRemoveButton = (e: any) => {
    e.preventDefault()
    let tempCashFlows = cashFlows.filter(item => {
      return item.key !== e.target.id
    })
    tempCashFlows = tempCashFlows.map((item, index) => {
      return { ...item, key: `Period${index + 1}`, label: `Period ${index + 1}` }
    })
    setCashFlows(tempCashFlows)
  }

  const handleDateFieldChange = (id: string) => (date: any) => {
    const tempCashFlows = cashFlows.map(item => {
      if (item.key === id) {
        return { ...item, transactionDate: new Date(date) }
      }
      return item
    })
    setCashFlows(tempCashFlows)
  }

  return (<div className='max-w-screen-xl mx-auto p-4 space-y-4'>
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
    <h2 className='text-2xl font-bold text-center'>XIRR Calculator</h2>
    <div className='grid md:grid-cols-2 gap-4 pt-2'>
      <div>
        <Form {...form}>
          <div className='grid md:grid-cols-2 gap-4'>
            <InputFieldsRenderer control={form.control} inputs={inputs.filter(input => { return input.id !== 'guess' })} />
            {cashFlows.map((input, index) => {
              return (
                <React.Fragment key={input.key}>
                  <div className='flex'>
                    <FormLabel className='flex items-center mr-2'>{index + 1}.</FormLabel>
                    <FormItem key={input.key} className='w-full'>
                      <FormControl>
                        <DatePicker value={input.transactionDate} id={input.key + ':date'} onChange={handleDateFieldChange(input.key)} placeholder={input.label} data-testid={input.key} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className='flex'>
                    <FormItem className='w-full'>
                      <FormControl><Input
                        key={input.key + ':value'}
                        id={input.key + ':value'}
                        type='number'
                        placeholder={input.label}
                        value={input.value.toString()}
                        onChange={handleTextFieldChange}
                      /></FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button className='ml-2' size='sm' variant='ghost' id={input.key} onClick={handlePeriodRemoveButton}>
                      <Trash2Icon className='pointer-events-none' />
                    </Button>
                  </div>
                </React.Fragment>)
            })}
          </div>
          <div className='grid md:grid-cols-2 gap-4 pt-4'>
            <InputFieldsRenderer control={form.control} inputs={inputs.filter(input => { return input.id === 'guess' })} />
          </div>
          <Button onClick={handleAddMoreButton} className='mt-4'>Add More</Button>
        </Form>
      </div>
      <div>
        <div className='text-xl text-center'>Summary</div>
        <div className='w-full p-4 flex flex-col gap-4 items-center'>
          <div className='flex gap-2'>
            <div>Calculated XIRR: </div>
            <div className='font-medium'>
              {xirrValue ? (xirrValue * 100).toFixed(2).toString() + '%' : 'Try again, Change values'}
            </div>
          </div>
        </div>
        <div className='grid gap-3'>
          <h1><b>About XIRR Calculator</b></h1>

          <h2>Input Fields:</h2>
          <ol>
            <li><strong>Values (Cash Flows):</strong> Enter the cash flows associated with your investment or project. Use negative values for cash outflows (money spent) and positive values for cash inflows (money received).</li>
            <li><strong>Dates:</strong> Corresponding to each cash flow, provide the date when it occurred.</li>
            <li><strong>Guess:</strong> Enter an initial guess for the rate of return. This is a starting point for the iterative process. If you&apos;re not sure, you can start with a reasonable estimate, such as 0.1 (10%).</li>
          </ol>

          <h2>Using the XIRR Formula:</h2>
          <ol>
            <li><strong>Define the Function:</strong> The XIRR formula finds the discount rate (rate of return) that makes the sum of the present values of cash flows equal to zero.</li>
            <li><strong>Iterative Process:</strong> Start with your initial guess. Calculate the Net Present Value (NPV) of cash flows using the guessed rate. Adjust the guess based on the calculated NPV and iterate until the NPV is close to zero.</li>
          </ol>
          <p> NPV = &#x03A3; CF<sub>t</sub>/(1 + r) <sup>(D<sub>t</sub> - D<sub>0</sub>)/365</sup></p>
          <p>Where:</p>
          <ul>
            <li>NPV is the Net Present Value,</li>
            <li>CF<sub>t</sub> is the cash flow at time t ,</li>
            <li>r is the guessed rate of return,</li>
            <li>D<sub>t</sub> is the date of cash flow at time t,</li>
            <li>D<sub>0</sub> is the base date (usually the earliest date).</li>
          </ul>

          <h2>Example:</h2>
          <p>Let&apos;s say you have the following data:</p>
          <ul>
            <li><strong>Values:</strong> [-1000, 200, 400, 600, 800]</li>
            <li><strong>Dates:</strong> [2024-01-01, 2025-01-01, 2026-01-01, 2027-01-01, 2028-01-01]</li>
            <li><strong>Guess:</strong> 0.1</li>
          </ul>
          <p>Using this data, you would input these values into your calculator, and the XIRR formula would iteratively calculate the internal rate of return based on the given guess.</p>

          <p><strong>Important Note:</strong> While you can understand the concept behind the XIRR formula, in practice, it&apos;s usually handled by financial software or tools, as the iterative process can be complex. Spreadsheet software like Excel simplifies this process for users by providing a built-in XIRR function that handles the calculations automatically.</p>
        </div>
      </div>
    </div>

  </div>)
}

export default XIRRCalculator
