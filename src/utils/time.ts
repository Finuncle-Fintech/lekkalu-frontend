export function monthsToSeconds(months: number) {
  const secondsInMinute = 60
  const minutesInHour = 60
  const hoursInDay = 24
  const daysInMonth = 30.44 // Average number of days in a month

  return months * secondsInMinute * minutesInHour * hoursInDay * daysInMonth
}

export function yearsToSeconds(years: number) {
  const secondsInMinute = 60
  const minutesInHour = 60
  const hoursInDay = 24
  const daysInYear = 365.25 // Average number of days in a year

  return years * secondsInMinute * minutesInHour * hoursInDay * daysInYear
}
