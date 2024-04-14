export function calculateTransactionAmount(type: 'lend' | 'borrow', amount: number): number {
  if (type === 'lend') {
    return amount // Positive amount for lending
  } else if (type === 'borrow') {
    return -amount // Negative amount for borrowing
  } else {
    throw new Error('Invalid transaction type. Use "lend" or "borrow".')
  }
}

export const TRANSACTION_TYPES = [
  { id: 'lend', value: 'Lend', label: 'Lend' },
  { id: 'borrow', value: 'Borrow', label: 'Borrow' },
]
export const PAYMENT_METHODS = [
  { id: 'upi', value: 'UPI', label: 'UPI' },
  { id: 'card', value: 'CARD', label: 'Card' },
  { id: 'cash', value: 'CASH', label: 'Cash' },
  { id: 'other', value: 'OTHER', label: 'Other' },
]
