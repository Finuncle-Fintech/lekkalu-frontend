import React, { createContext, useReducer, useState } from 'react'
import Reducer, { InitialState } from './Reducer'
import Types from './Types'

const Context = createContext({
  ...InitialState,
})

const Provider = ({ children }) => {
  const [authToken] = useState(null)
  const [store, dispatch] = useReducer(Reducer, InitialState)
  const { statusFeedback, expenses, tags, weeklyExpense, monthlyExpenses, liabilities, incomeStatement } = store

  const handleErrors = (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        alert(error.response.data.detail)
      } else if (error.response.status === 500) {
        alert(error.message)
      }
    }
    if (error.message === 'Network Error') {
      alert('Network Error')
    }
  }

  const giveFeedback = async (data) => {
    const statusFeedback = []
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      await axiosPrivate
        .post(`${process.env.REACT_APP_BACKEND_API}feedback/`, data, {
          headers,
        })
        .then((res) => {
          statusFeedback.push(res.status)
        })
    } catch (err) {
      statusFeedback.push(err)
      handleErrors(err)
    }

    return statusFeedback
  }

  const fetchTags = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      await axiosPrivate.get(`${process.env.REACT_APP_BACKEND_API}expense-tag/`, { headers }).then((res) => {
        dispatch({
          type: Types.FETCH_TAGS,
          payload: res.data,
        })
      })
    } catch (error) {
      handleErrors(error)
    }
  }

  const fetchAllExpenses = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      const response = await axiosPrivate.get(`${process.env.REACT_APP_BACKEND_API}expenses/`, { headers })
      return response.data
    } catch (error) {
      handleErrors(error)
      throw error // Rethrow the error so it can be caught in the calling function
    }
  }

  return (
    <Context.Provider
      value={{
        expenses,
        tags,
        weeklyExpense,
        monthlyExpenses,
        liabilities,
        incomeStatement,
        statusFeedback,
        giveFeedback,
        fetchTags,
        fetchAllExpenses,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }
