export const numDifferentiation = (val) => {
  if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr'
  else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lac'
  else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K'
  return val
}
