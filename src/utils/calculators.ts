export function calculateSip(monthlyAmount: number, durationInvestment: number, rateReturn: number) {
  const months = durationInvestment * 12
  const rateMonth = rateReturn / 100 / 12

  const totalInvested = monthlyAmount * months

  let finalValue = (monthlyAmount * (Math.pow(1 + rateMonth, months) - 1)) / rateMonth

  finalValue = parseInt(finalValue.toFixed(0))
  const wealthGained = finalValue - totalInvested

  return { totalInvested, finalValue, wealthGained }
}
