export const formatDate = (date) => {
  const pad = (n) => (n < 10 ? '0' + n : n)
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  const offset = -date.getTimezoneOffset()
  const sign = offset >= 0 ? '+' : '-'
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60))
  const offsetMinutes = pad(Math.abs(offset) % 60)

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`
}

export const preventPropagationOnEnter = (event) => {
  if (event.key === 'Enter') event.preventDefault()
}

export const checkTagsAndLoad = (newMyTags, tags, nameOfTagsExpenses, createTag) => {
  const getNewId = () => {
    const maxId = tags.map((tag) => tag.id)
    return Math.max(...maxId) + 1
  }

  const copyTagsOfExpense = Array.from(nameOfTagsExpenses)

  const promises = copyTagsOfExpense.map(async (newTag) => {
    const newTagName = newTag.name
    const newTagNameUpperCase = newTagName.replace(newTagName[0], newTagName[0].toUpperCase())

    const exist = tags.some((tag) => tag.name === newTagNameUpperCase)

    if (!exist) {
      const newTagElement = {
        id: getNewId(),
        name: newTagNameUpperCase,
      }

      newMyTags.push(newTagElement)

      tags.push(newTagElement)

      await createTag(newTagElement)

      return newTagElement
    } else {
      newMyTags.push({ name: newTagNameUpperCase })
      return { name: newTagNameUpperCase }
    }
  })
  return Promise.all(promises)
}

export const getTagNumbers = (tagValues, tags) => {
  return tagValues
    .map((tagValue) => {
      const foundTag = tags.find((tag) => tag.name === tagValue.name)

      return foundTag ? foundTag.id : null
    })
    .filter((tag) => tag !== undefined)
}
