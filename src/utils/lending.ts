export function calculateTransactionAmount(type: 'lend' | 'borrow', amount: number): number {
  if (type === 'lend') {
    return amount // Positive amount for lending
  } else if (type === 'borrow') {
    return -amount // Negative amount for borrowing
  } else {
    throw new Error('Invalid transaction type. Use "lend" or "borrow".')
  }
}
