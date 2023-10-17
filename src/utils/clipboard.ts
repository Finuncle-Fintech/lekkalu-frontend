export const createUrlString = (params: Record<string, string | number>) => {
  const url = Object.entries(params)
    .map((e) => e.join('='))
    .join('&')
  return url
}

export const copyToClipboard = (str: string) => {
  navigator.clipboard.writeText(str).catch((error) => {
    console.error('Failed to copy string: ', error)
  })
}

export const handleShare = (data: Record<string, string | number>) => {
  const url = createUrlString(data)
  const share_url = `${window.location.href}?${url}`

  copyToClipboard(share_url)
}
