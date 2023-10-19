export const formatDate = (date: Date): string => {
  const pad = (n: number): string => (n < 10 ? '0' + n : String(n))
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

export const preventPropagationOnEnter:React.KeyboardEventHandler<HTMLDivElement> = (event) => {
  if (event.key === 'Enter') event.preventDefault()
}

export const checkExpensesDoesNotRepeat = async (newExpense: any, axiosPrivate: any, authToken: string): Promise<boolean> => {
  let response: boolean | null = null
  // If the amount of the new expense does not contain decimals, this conditional adds .00 to compare it with others
  if (newExpense.amount % 1 !== 0) newExpense.amount = `${newExpense.amount}.00`
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
    await axiosPrivate
      .get(`${process.env.REACT_APP_BACKEND_API}expenses/`, {
        headers,
      })
      .then((res: any) => {
        res?.data.forEach((expenses: any) => {
          if (expenses.amount === newExpense.amount) {
            const existingTags = expenses.tags.sort()
            const newTags = newExpense.tags.sort()
            const sameTags = existingTags.map((data: any, index: number) => {
              if (data === newTags[index]) return true
              return false
            })

            if (!sameTags.includes(false)) {
              const date = new Date(expenses.time)
              const monthExisting = date.getMonth() + 1
              const dayExisting = date.getDate()
              const yearExisting = date.getFullYear()

              const newExpenseDate = new Date(newExpense.time)
              const day = newExpenseDate.getDate()
              const month = newExpenseDate.getMonth() + 1
              const year = newExpenseDate.getFullYear()

              const existingDate = `${monthExisting} ${dayExisting} ${yearExisting}`
              const newDate = `${month} ${day} ${year}`

              if (newDate === existingDate) {
                response = true
              }
            }
          }
        })
      })
  } catch (error) {
    console.error(error)
  }

  return response || false
}

export const checkTagsAndLoad = async (newMyTags: any[], tags: any[], nameOfTagsExpenses: any[], createTag: (tag: any) => Promise<void>): Promise<any[]> => {
  const getNewId = (): number => {
    const maxId = tags.map((tag) => tag.id)
    return Math.max(...maxId) + 1
  }

  const copyTagsOfExpense = Array.from(nameOfTagsExpenses)

  const promises = copyTagsOfExpense.map(async (newTag: any) => {
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

export const getTagNumbers = (tagValues: any[], tags: any[]): number[] => {
  return tagValues
    .map((tagValue: any) => {
      const foundTag = tags.find((tag) => tag.name === tagValue.name)

      return foundTag ? foundTag.id : null
    })
    .filter((tag) => tag !== undefined) as number[]
}
