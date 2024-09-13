import React, { useEffect, useReducer, useState } from 'react'
import dayjs from 'dayjs'
import { buttonVariants } from '@/components/ui/button'
import DatePicker from '@/components/DatePicker/DatePicker'

// Define a type for transactions
interface Transaction {
  date: string
  amount: number
}

// Helper function to calculate NPV (Net Present Value)
const calculateNPV = (transactions: Transaction[], rate: number) => {
  if (transactions.length === 0) {
    return 0 // Return 0 if there are no transactions
  }
  let npv = 0
  const startDate = new Date(transactions[0].date).getTime() // Start date for time-based discounting
  transactions.forEach((tx) => {
    const time = (new Date(tx.date).getTime() - startDate) / (1000 * 60 * 60 * 24 * 365) // time in years
    npv += tx.amount / Math.pow(1 + rate, time)
  })
  return npv
}

// Custom IRR Calculation using the Newton-Raphson method
const calculateIRR = (transactions: Transaction[], guess = 0.1): number | null => {
  const tolerance = 1e-6 // tolerance for accuracy
  const maxIterations = 1000 // limit iterations to avoid infinite loops
  let rate = guess // initial guess for IRR

  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(transactions, rate)
    const npvDerivative = (calculateNPV(transactions, rate + tolerance) - npv) / tolerance

    const newRate = rate - npv / npvDerivative

    if (Math.abs(newRate - rate) < tolerance) {
      return newRate // Converged to a solution
    }
    rate = newRate
  }
  return null // Return null if IRR not found within max iterations
}

// payload is the index of the transaction to remove
type Action = { type: 'ADD_TRANSACTION'; payload: Transaction } | { type: 'REMOVE_TRANSACTION'; payload: number }

// Reducer function
const transactionReducer = (state: Transaction[], action: Action): Transaction[] => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, action.payload]
    case 'REMOVE_TRANSACTION':
      return state.filter((_, index) => index !== action.payload)
    default:
      return state
  }
}

// Component for XIRR calculation
export default function IrrCalculator() {
  // Initialize transactions with reducer with some default values
  const [transactions, dispatchTxns] = useReducer(transactionReducer, [
    { date: '2021-01-01', amount: -1000 },
    { date: '2021-02-01', amount: 200 },
    { date: '2021-03-01', amount: 300 },
    { date: '2021-04-01', amount: 400 },
    { date: '2021-05-01', amount: 500 },
  ])

  const [date, setDate] = useState(Date())
  const [amount, setAmount] = useState('')
  const [irr_calculated, setIrr_calculated] = useState<number | null>(0)

  const addTransaction = () => {
    if (date && amount) {
      const locale_date = new Date(date.split('GMT')[0]).toLocaleDateString('en-CA')
      const newTransaction = { date: locale_date, amount: parseFloat(amount) }
      dispatchTxns({ type: 'ADD_TRANSACTION', payload: newTransaction })
      setDate(locale_date)
      setAmount(amount)
      setIrr_calculated(calculateIRR([...transactions, { date, amount: parseFloat(amount) }]))
    }
  }

  const removeTxn = (index: number) => {
    dispatchTxns({ type: 'REMOVE_TRANSACTION', payload: index })
    setIrr_calculated(calculateIRR(transactions.filter((_, i) => i !== index)))
  }

  // run the IRR calculation when the component is rendered initially
  useEffect(() => {
    setIrr_calculated(calculateIRR(transactions))
  }, [transactions])

  return (
    <div>
      <h2>Add New Transaction</h2>
      <DatePicker value={dayjs(date).toDate()} onChange={(value) => setDate(value?.toString() || '')} />
      <input
        className={
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ' +
          'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
          'disabled:cursor-not-allowed disabled:opacity-50'
        }
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className={buttonVariants({ variant: 'default' })} onClick={addTransaction}>
        Add Transaction
      </button>

      <div className='card glass w-96'>
        <div className='card-body'>
          <h2 className='card-title'>Summary</h2>
          <p>Total Investment: 5000</p>
          <p>Profit: 5000</p>
          <p>Internal Rate of Return: 5000</p>
          <p>Calculated IRR: {irr_calculated !== null ? (irr_calculated! * 100).toFixed(2) + '%' : 'N/A'}</p>
        </div>
      </div>
      <div className='overflow-x-auto max-w-2xl mx-auto'>
        <h2 className='text-2xl font-bold text-left my-4'>Transaction Table</h2>
        <table className='table w-full'>
          <thead className='text-lg text-base-content'>
            <tr>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Transaction</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className=''>
                <td className='px-4 py-2 '>{index + 1}</td>
                <td className='px-4 py-2 '>{tx.date}</td>
                <td className='px-4 py-2 '>{tx.amount}</td>
                <td className='px-4 py-2 '>
                  <button className={buttonVariants({ variant: 'destructive' })} onClick={() => removeTxn(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
