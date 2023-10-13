export const handleAmountChange = (value) => {
  if (isPercentageValid(value) || isAmountValid(value) || value === '') {
    return true
  } else {
    return false
  }
}

export const handleReachabilityChange = (value, setReachability) => {
  if (isReachabilityValid(value) || value === '') {
    setReachability(value)
  } else {
  }
}

export const handleFinishedDateChange = async (date, startDate) => {
  if (date.$d.getTime() < startDate.$d.getTime()) {
    alert('Finish date cannot be before start date')
    return false
  }
}

export const isAmountValid = (value) => {
  const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/
  return regex.test(value)
}

export const isPercentageValid = (value) => {
  const regex = /^100(\.0{0,2})? *%?$|^\d{1,2}(\.\d{1,2})? *%?$/
  return regex.test(value)
}

export const isReachabilityValid = (value) => {
  const regex = /^(0|[1-9]\d*)?$/
  return regex.test(value)
}
