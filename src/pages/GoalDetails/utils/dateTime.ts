import { Timeline } from '@/types/goals'

type GoalTimelineWithTarget = Timeline & { target: number }

function isEndOfWeek(isoDate: string): boolean {
  const date = new Date(isoDate)
  return date.getDay() === 0
}

function isStartOfMonth(isoDate: string) {
  const _isoDate = isoDate.split('T')[0]
  const [year, month, day] = _isoDate.split('-').map(Number)
  const firstDatOfMonth = new Date(year, month, 1).getDate()
  return day === firstDatOfMonth
}

function isStartOfYear(isoDate: string) {
  const date = new Date(isoDate)
  return date.getMonth() === 0 && date.getDate() === 1
}

export function convertDays(days: number) {
  const _days = Math.abs(days)
  const weeks = Math.floor(_days / 7)
  const remainingDaysInWeek = _days % 7

  const months = Math.floor(_days / 30)
  const remainingDaysInMonth = _days % 30

  const years = Math.floor(_days / 365)
  const remainingMonthsInYear = Math.floor((_days % 365) / 30)

  if (years) {
    return days < 0
      ? `This goal expired ${years} years ${remainingMonthsInYear} months ago.`
      : `This goal will expire after ${years} years ${remainingMonthsInYear} months.`
  } else if (months) {
    return days < 0
      ? `This goal expired ${months} month ${remainingDaysInMonth} days ago.`
      : `This goal will expire after ${months} months ${remainingDaysInMonth} days.`
  } else if (weeks) {
    return days < 0
      ? `This goal expired ${weeks} weeks ${remainingDaysInWeek} days ago.`
      : `This goal will expire after ${weeks} weeks ${remainingDaysInWeek} days.`
  } else {
    return days < 0 ? `This goal expired ${days} days ago` : `This goal will expire after ${days} days.`
  }
}

function getNextISODate(currentISODate: string): string {
  const date = new Date(currentISODate)
  date.setDate(date.getDate() + 1)
  const nextISODate = date.toISOString().substring(0, 10)
  return nextISODate
}

export const getDataByWeek = (arr: Array<Timeline>, target: number) => {
  const result: Array<GoalTimelineWithTarget> = []
  const current = {
    totalDays: 0,
    aggValue: 0,
    date: arr[0].time,
  }

  arr.forEach((item: any, index: number) => {
    /** for first item and is not end of week.
    /*  for example: if first time of array is 8th january and 8th january is not the end of the week.
    */
    if (index === 0 && !isEndOfWeek(item.time)) {
      current.date = item.time
      result.push({ time: item.time, kpi_value: item.kpi_value, target })
    } else {
      current.aggValue += item.kpi_value
      current.totalDays += 1
    }

    // for the last item of the array.
    if (index + 1 === arr.length) {
      result.push({
        time: item.time,
        kpi_value: +((current.aggValue + item.kpi_value) / (current.totalDays + 1)).toFixed(2),
        target,
      })
      return
    }

    /**
     * for the date which is the end of the week.
     */
    if (isEndOfWeek(item.time)) {
      result.push({ time: current.date, kpi_value: +(current.aggValue / current.totalDays).toFixed(2), target })
      current.totalDays = 0
      current.aggValue = 0
    } else {
      current.aggValue += item.kpi_value
      current.totalDays += 1
    }

    current.date = getNextISODate(current.date)
  })
  return result
}

export const getDataByMonth = (arr: Array<Timeline>, target: number) => {
  const result: Array<GoalTimelineWithTarget> = []
  const current = {
    totalDays: 0,
    aggValue: 0,
    date: arr[0].time,
  }

  arr.forEach((item: any, index: number) => {
    // for the first item of the array which is not the start of the month
    if (index === 0 && !isStartOfMonth(item.time)) {
      current.date = item.time
      result.push({ time: item.time, kpi_value: item.kpi_value, target })
    } else {
      current.aggValue += item.kpi_value
      current.totalDays += 1
    }

    // for last day in the given array.
    if (index + 1 === arr.length) {
      result.push({
        time: item.time,
        kpi_value: +((current.aggValue + item.kpi_value) / (current.totalDays + 1)).toFixed(2),
        target,
      })
      return
    }

    if (isStartOfMonth(item.time)) {
      result.push({ time: current.date, kpi_value: +(current.aggValue / current.totalDays).toFixed(2), target })
      current.totalDays = 0
      current.aggValue = 0
    } else {
      current.aggValue += item.kpi_value
      current.totalDays += 1
    }
    current.date = getNextISODate(current.date)
  })
  return result
}

export const getDataByYear = (arr: Array<Timeline>, target: number) => {
  const result: Array<GoalTimelineWithTarget> = []
  const current = {
    totalDays: 0,
    aggValue: 0,
    date: arr[0].time,
  }

  arr.forEach((item: any, index: number) => {
    // for the first item of the array which is not the start of the month
    if (index === 0 && !isStartOfYear(item.time)) {
      current.date = item.time
      result.push({ time: item.time, kpi_value: item.kpi_value, target })
    } else {
      current.aggValue += item.kpi_value
      current.totalDays += 1
    }

    // for last day in the given array.
    if (index + 1 === arr.length) {
      result.push({
        time: item.time,
        kpi_value: +((current.aggValue + item.kpi_value) / (current.totalDays + 1)).toFixed(2),
        target,
      })
      return
    }

    if (isStartOfYear(item.time)) {
      result.push({ time: current.date, kpi_value: +(current.aggValue / current.totalDays).toFixed(2), target })
      current.totalDays = 0
      current.aggValue = 0
    } else {
      current.aggValue += item.kpi_value
      current.totalDays += 1
    }
    current.date = getNextISODate(current.date)
  })
  return result
}
