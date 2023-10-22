import dayjs from 'dayjs'

export const BUDGET_MONTH_OPTIONS = Array.from({ length: 12 }).map((_, idx) => {
  const month = dayjs().month(idx)

  return {
    id: idx.toString(),
    label: month.format('MMMM'),
  }
})
