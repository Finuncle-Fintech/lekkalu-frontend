export function normalizeNumber(value?: number): number {
  return Number.isNaN(value) || !value ? 0 : value
}
