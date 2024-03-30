/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
interface DataItem {
  time: string
  kpi_value: number
}

export const mergeArraysByDate = (a: any): DataItem[] => {
  // Combine all arrays into one array
  const arrays = Object.values(a)
  const arraysKeys = Object.keys(a)
  const combinedArray: any = arrays.reduce((acc: any, curr) => acc.concat(curr), [])

  // Sort the combined array based on the "date" property
  combinedArray.sort((a: any, b: any) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))

  const result = combinedArray.map((each: any) => {
    let obj: any = { time: each?.time }
    arraysKeys.forEach((eachKey: any) => {
      const value = a[eachKey]?.find((arraysValue: any) => arraysValue?.time === each?.time)
      obj[eachKey] = value?.kpi_value
    })
    return obj
  })

  result.forEach((each: any, index: number) => {
    const properties = Object.keys(each).filter((key) => key !== 'time')
    let highest = Number.MIN_SAFE_INTEGER
    properties.forEach((key) => {
      const value = typeof each[key] === 'number' ? (each[key] as number) : 0
      if (value > highest) {
        highest = value
      }
    })
    each.value = highest
  })

  return result
}

export const generateRandomColor = (number: number): string => {
  const hue = number * 137.508 // use golden angle approximation
  return `hsl(${hue},100%,30%)`
}
