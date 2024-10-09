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
  const colors = [
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A1',
    '#33FFA1',
    '#A133FF',
    '#FF9E33',
    '#33FF9E',
    '#9E33FF',
    '#FF334D',
    '#4DFF33',
    '#334DFF',
    '#FFD133',
    '#33FFD1',
    '#D133FF',
    '#FF8C33',
    '#33FF8C',
    '#8C33FF',
    '#FF337A',
    '#7AFF33',
    '#337AFF',
    '#FFDB33',
    '#33FFDB',
    '#DB33FF',
    '#FF7033',
    '#33FF70',
    '#7033FF',
    '#FF33B8',
    '#B833FF',
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A1',
    '#33FFA1',
    '#A133FF',
    '#FF9E33',
    '#33FF9E',
    '#9E33FF',
    '#FF334D',
    '#4DFF33',
    '#334DFF',
    '#FFD133',
    '#33FFD1',
    '#D133FF',
    '#FF8C33',
    '#33FF8C',
    '#8C33FF',
    '#FF337A',
    '#7AFF33',
    '#337AFF',
    '#FFDB33',
    '#33FFDB',
    '#DB33FF',
    '#FF7033',
    '#33FF70',
    '#7033FF',
    '#FF33B8',
    '#B833FF',
    '#FF338C',
    '#8CFF33',
    '#338CFF',
    '#FFBF33',
    '#33FFBF',
    '#BF33FF',
    '#FF4533',
    '#33FF45',
    '#4533FF',
    '#FF33C7',
    '#C733FF',
    '#FF3391',
    '#9133FF',
    '#FF9157',
    '#5791FF',
    '#FF57A7',
    '#57FFA7',
    '#A757FF',
    '#FFA757',
    '#57FFA7',
    '#A757FF',
    '#57A7FF',
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A1',
    '#33FFA1',
    '#A133FF',
    '#FF9E33',
    '#33FF9E',
    '#9E33FF',
    '#FF334D',
    '#4DFF33',
    '#334DFF',
    '#FFD133',
    '#33FFD1',
    '#D133FF',
    '#FF8C33',
    '#33FF8C',
    '#8C33FF',
    '#FF337A',
    '#7AFF33',
    '#337AFF',
    '#FFDB33',
    '#33FFDB',
    '#DB33FF',
  ]
  return colors[number]
}
