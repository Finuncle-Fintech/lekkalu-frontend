/**
 * @param -> { key: '1' }
 * @returns -> { key: 1 }
 */
export function parseNumbers(objectToParse) {
  const parsedObject = {}
  Object.entries(objectToParse).forEach(([key, value]) => {
    if (!isNaN(Number(value))) {
      parsedObject[key] = Number(value)
    } else {
      parseNumbers[key] = value
    }
  })
  return parsedObject
}
