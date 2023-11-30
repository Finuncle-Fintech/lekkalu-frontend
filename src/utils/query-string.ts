export const parseQueryString = (queryString: string) => {
  const paramsArray = queryString.substring(1).split('&')
  return paramsArray.reduce(
    (result, param) => {
      const [key, value] = param.split('=')
      if (key !== '') {
        if (!isNaN(Number(value))) {
          result[key] = Number(value)
        } else {
          result[key] = value
        }
      }
      return result
    },
    {} as Record<string, string | number>,
  )
}
