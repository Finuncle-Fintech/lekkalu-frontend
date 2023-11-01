import dayjs from 'dayjs'
import { round } from 'lodash'
import { Liability } from '@/types/balance-sheet'
import { TRANSACTIONS } from '@/data/transactions'

export type Durations = (typeof DURATIONS)[number]['id']

export const DURATIONS = [
  {
    id: 'LAST_THREE_MONTHS',
    label: 'Last Three Months',
    months: getLastMonths(3),
  },
  {
    id: 'LAST_SIX_MONTHS',
    label: 'Last Six Months',
    months: getLastMonths(6),
  },
  {
    id: 'LAST_1_YEAR',
    label: 'Last One Years',
    months: getLastMonths(12),
  },
] as const

function getLastMonths(count: number) {
  return Array.from({ length: count }, (_, i) =>
    dayjs()
      .subtract(i + 1, 'month')
      .endOf('month'),
  )
}

export function getLoanOverviewData(loans: Liability[], months: dayjs.Dayjs[]) {
  const totalPrincipal = loans.reduce((acc, curr) => (acc += Number(curr.principal)), 0)

  const calculatedResults: Array<{ month: string; outstandingPercentage: number }> = []

  for (const month of months) {
    const transactionsForMonth = TRANSACTIONS.filter(
      (transaction) => transaction.date.format('MMYYYY') === month.format('MMYYYY'),
    )

    const totalOutstanding = transactionsForMonth.reduce((acc, curr) => (acc += Number(curr.amount)), 0)

    const outstandingPercentage = round((totalOutstanding / totalPrincipal) * 100, 2)

    calculatedResults.push({
      month: month.format('MMM YYYY'),
      outstandingPercentage,
    })
  }

  return calculatedResults
}
