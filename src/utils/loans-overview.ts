import dayjs from 'dayjs'
import { round } from 'lodash'
import { Liability, LoanTransaction } from '@/types/balance-sheet'
import { fetchTransactionsForLoan } from '@/queries/balance-sheet'

export type Durations = (typeof DURATIONS)[number]['id']

export const DURATIONS = [
  {
    id: 'NEXT_THREE_MONTHS',
    label: 'Next Three Months',
    months: getNextMonths(3),
  },
  {
    id: 'NEXT_SIX_MONTHS',
    label: 'Next Six Months',
    months: getNextMonths(6),
  },
  {
    id: 'NEXT_1_YEAR',
    label: 'Next One Years',
    months: getNextMonths(12),
  },
  {
    id: 'NEXT_2_YEAR',
    label: 'Next Two Years',
    months: getNextMonths(24),
  },
] as const

function getNextMonths(count: number) {
  return Array.from({ length: count }, (_, i) =>
    dayjs()
      .add(i + 2, 'month')
      .endOf('month'),
  )
}

export async function getLoanOverviewData(loans: Liability[], months: dayjs.Dayjs[]) {
  const totalPrincipal = loans.reduce((acc, curr) => (acc += Number(curr.principal)), 0)
  const transactions: (LoanTransaction & { balance: number })[] = []

  /** Getting all the transactions for all loans */
  for (const loan of loans) {
    let balance = Number(loan.principal)
    const fetchedTransactions = await fetchTransactionsForLoan(loan.id)

    /** calculating balance for transaction */
    for (const transaction of fetchedTransactions) {
      if (dayjs(transaction.time).format('MMYYYY') === dayjs().format('MMYYYY')) {
        continue
      }

      const tnxBalance = round(balance - Number(transaction.amount), 2)
      transactions.push({ ...transaction, balance: tnxBalance })
      balance = tnxBalance
    }
  }

  const calculatedResults: Array<{ month: string; outstandingPercentage: number }> = []

  /** Filtering DEBIT transactions */
  const debitTransactions = transactions.filter((transaction) => transaction.type === 2)

  /** Calculating outstanding percentage for each month  */
  for (const month of months) {
    const transactionsForMonth = debitTransactions.filter(
      (transaction) => dayjs(transaction.time).format('MMYYYY') === month.format('MMYYYY'),
    )

    const totalOutstanding = transactionsForMonth.reduce((acc, curr) => (acc += Number(curr.balance)), 0)
    const outstandingPercentage = round((totalOutstanding / totalPrincipal) * 100, 2)
    calculatedResults.push({
      month: month.format('MMM YYYY'),
      outstandingPercentage,
    })
  }

  return calculatedResults
}
