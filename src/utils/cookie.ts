export const getCookie = (name: string) => {
  // Split cookie string and get all individual name=value pairs in an array
  const cookieArr = document.cookie.split(';')

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=')

    /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1])
    }
  }

  // Return null if not found
  return null
}

export const setCookie = (name: string, value: string, daysToLive: number) => {
  // Encode value in order to escape semicolons, commas, and whitespace
  let cookie = name + '=' + encodeURIComponent(value)

  if (typeof daysToLive === 'number') {
    /* Sets the max-age attribute so that the cookie expires
          after the specified number of days */
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60

    document.cookie = cookie
  }
}
