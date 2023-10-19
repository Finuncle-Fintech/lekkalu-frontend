export const handleAmountChange = (value: string): boolean => {
  if (isPercentageValid(value) || isAmountValid(value) || value === '') {
    return true
  } else {
    return false
  }
}

export const handleFinishedDateChange = async (date: Date, startDate: Date): Promise<boolean | void> => {
  if (date.getTime() < startDate.getTime()) {
    alert('Finish date cannot be before start date')
    return false
  }
}

export const isAmountValid = (value: string): boolean => {
  const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/
  return regex.test(value)
}

export const isPercentageValid = (value: string): boolean => {
  const regex = /^100(\.0{0,2})? *%?$|^\d{1,2}(\.\d{1,2})? *%?$/
  return regex.test(value)
}

export const isReachabilityValid = (value: string): boolean => {
  const regex = /^(0|[1-9]\d*)?$/
  return regex.test(value)
}
