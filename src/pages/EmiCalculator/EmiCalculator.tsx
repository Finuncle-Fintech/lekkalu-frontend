import React, { useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import { useLocation } from 'react-router'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { emiCalculatorSchema } from '@/schema/calculators'
import { parseQueryString } from '@/utils/query-string'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { handleShare } from '@/utils/clipboard'
import { calculateAssetsForEmi, calculateEmi, calculateTenureByUnit } from '@/utils/calculators'
import When from '@/components/When/When'
// @ts-expect-error
import { AssetsLiabilitiesChart } from '../../components/Charts/AssetsLiabilitiesChart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type EmiValues = z.infer<typeof emiCalculatorSchema>

const DEFAULT_DATA: EmiValues = {
  loanPrincipal: 300000,
  loanInterest: 11,
  loanTenure: 3,
  emiDay: 5,
  disbursementDate: new Date(),
}

// @TODO: add unit change options
const EmiCalculator = () => {
  const location = useLocation()
  const parsedObject = parseQueryString(location.search)
  const [isCopied, setIsCopied] = useState(false)

  const { toast } = useToast()

  const form = useForm<EmiValues>({
    resolver: zodResolver(emiCalculatorSchema),
    defaultValues: !isEmpty(parsedObject) ? parsedObject : DEFAULT_DATA,
  })
  const values = form.watch()

  const result = useMemo(() => {
    if (!values.loanPrincipal || !values.loanInterest || !values.loanTenure) {
      return undefined
    }

    const summary = calculateEmi(values.loanPrincipal, values.loanInterest, values.loanTenure, 'Months')
    const assets = calculateAssetsForEmi(values.loanPrincipal, summary?.total_interest_payable!)
    const tenure = calculateTenureByUnit('Months', values.loanTenure)

    return { summary, assets, tenure }
  }, [values.loanInterest, values.loanPrincipal, values.loanTenure])

  const inputs: Array<InputField> = [
    {
      id: 'loanPrincipal',
      label: 'Loan Principal',
      type: 'number',
      hasRange: true,
      range: {
        min: 0,
        max: 10000000,
        step: 100,
      },
    },
    {
      id: 'loanInterest',
      label: 'Loan Interest',
      type: 'number',
      hasRange: true,
      range: {
        min: 0,
        max: 100,
        step: 1,
      },
    },
    {
      id: 'loanTenure',
      label: 'Loan Tenure',
      type: 'number',
      className: 'col-span-full',
      hasRange: true,
      range: {
        min: 0,
        max: 240,
        step: 6, // @TODO: Update according to unit
      },
    },
    {
      id: 'disbursementDate',
      label: 'Disbursement Date',
      type: 'date',
      defaultDate: !isEmpty(parsedObject) ? dayjs.unix(parsedObject.disbursementDate as number).toDate() : new Date(),
    },
    {
      id: 'emiDay',
      label: 'Emi Day',
      type: 'number',
    },
  ]

  const handleCopy = () => {
    setIsCopied(true)
    handleShare({ ...values, disbursementDate: dayjs(values.disbursementDate).unix() })
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

      <h2 className='text-2xl font-bold text-center'>EMI Calculator</h2>

      <Form {...form}>
        <form className='grid md:grid-cols-2 gap-4'>
          <InputFieldsRenderer control={form.control} inputs={inputs} />
        </form>
      </Form>

      <When truthy={typeof result !== 'undefined'}>
        <h2 className='text-2xl text-center'>Summary</h2>
        <div className='grid md:grid-cols-2 gap-4'>
          <div className='flex items-center justify-center flex-col gap-4 text-center'>
            <div>
              <div>Loan EMI</div>
              <div className='text-2xl font-medium'>{result?.summary?.loan_emi}</div>
            </div>
            <div>
              <div>Total Interest Payable</div>
              <div className='text-2xl font-medium'>{result?.summary?.total_interest_payable}</div>
            </div>
            <div>
              <div>Total Payment</div>
              <div className='text-2xl font-medium'>{result?.summary?.total_payment}</div>
            </div>
          </div>

          <AssetsLiabilitiesChart data={result?.assets} type='assets' />
        </div>
      </When>

      <Table className='border rounded shadow-sm'>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Total Payment</TableHead>
            <TableHead>Outstanding Principal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result?.summary?.repayment_table.map((record) => (
            <TableRow key={record.month}>
              <TableCell>{Math.abs(record.month)}</TableCell>
              <TableCell>{Math.abs(record.principal)}</TableCell>
              <TableCell>{Math.abs(record.interest)}</TableCell>
              <TableCell>{Math.abs(record.total_payment)}</TableCell>
              <TableCell>{Math.abs(record.outstandingPrincipal)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default EmiCalculator
