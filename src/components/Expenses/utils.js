
export const formatDate = (date) => {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
};

export const preventPropagationOnEnter = (event) => {
  if (event.key === 'Enter') event.preventDefault();
};


export const checkExpensesDoesNotRepeat = async(newExpense, axiosPrivate, authToken) =>{
    let response = null
    // If the amount of the new expense does not contain a decimals, this conditional adds .00 for compare it with others
    !(newExpense.amount%1!==0)&&(newExpense.amount=`${newExpense.amount}.00`)
    try {
       const headers = {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
       };
       await axiosPrivate
          .get(`${process.env.REACT_APP_BACKEND_API}expenses/`, {
             headers,
          })
          .then((res) => {
             res?.data.filter((expenses)=>{
              if(expenses.amount === newExpense.amount){
                const existingsTags = expenses.tags.sort()
                const newTags = newExpense.tags.sort()
                const sameTags = existingsTags.map((data, index)=>{
                  if(data === newTags[index]) return true
                  return false
                })

                if(!sameTags.includes(false)){
                  const date = new Date(expenses.time)
                  const monthExisting = date.getMonth()+1
                  const dayExisting = date.getDate()
                  const yearExisting = date.getFullYear()

                  const newExpenseDate = new Date(newExpense.time)
                  const day = newExpenseDate.getDate()
                  const month = newExpenseDate.getMonth()+1
                  const year = newExpenseDate.getFullYear()

                  const existingDate = `${monthExisting} ${dayExisting} ${yearExisting}`
                  const newDate = `${month} ${day} ${year}`

                  if(newDate === existingDate){
                    response = true
                    return
                  }
                }
              }
             })
          });
         
    } catch (error) {
       console.error(error);
    }

    return response || false
}

export const checkTagsAndLoad = (newMyTags, tags, nameOfTagsExpenses, createTag) =>{
  
  const getNewId = () =>{
    const maxId = tags.map((tag)=>tag.id)
    return (Math.max(...maxId)+1)
  }

  const copyTagsOfExpense = Array.from(nameOfTagsExpenses)

  const promises = copyTagsOfExpense.map(async (newTag) => {
      const newTagName = newTag.name
      const newTagNameUpperCase = newTagName.replace(newTagName[0], newTagName[0].toUpperCase())

      const exist = tags.some((tag) => tag.name === newTagNameUpperCase);

      if (!exist) {

        const newTagElement = {
          id: getNewId(),
          name: newTagNameUpperCase,
        };

        newMyTags.push(newTagElement);

        tags.push(newTagElement);

        await createTag(newTagElement);
        
        return newTagElement;
    } else {
      newMyTags.push({name:newTagNameUpperCase});
      return {name:newTagNameUpperCase};
    }
  });
  return Promise.all(promises);
}

export  const getTagNumbers = (tagValues, tags) => {
  return tagValues
    .map((tagValue) => {
      const foundTag = tags.find((tag) => tag.name === tagValue.name);

      return foundTag ? foundTag.id : null;
    })
    .filter((tag) => tag !== undefined);
};