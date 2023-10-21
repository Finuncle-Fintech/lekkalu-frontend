import React, { createContext, useReducer, useState, useContext } from 'react'
import axiosClient from '@/components/Axios/Axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import deleteCookie from '@/components/Support/PopUp/utils/DeleteCookie'
import Reducer, { InitialState } from './Reducer'
import Types from './Types'

const Context = createContext({
  ...InitialState,
})

const Provider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()
  const [authToken, setAuthToken] = useState(null)
  const [store, dispatch] = useReducer(Reducer, InitialState)
  const {
    statusFeedback,
    expenses,
    tags,
    weeklyExpense,
    monthlyExpenses,
    liabilities,
    incomeStatement,
    depreciation,
    goals,
  } = store

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
  const signOut = () => {
    setAuthToken(null)
    deleteCookie('refresh')
  }

  const fetchGoals = async (page, rowsPerPage) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }

    await axiosClient
      .get(`${process.env.REACT_APP_BACKEND_URL}api/financial_goal/`, {
        headers,
        params: {
          page: page + 1,
          per_page: rowsPerPage,
        },
      })
      .then((response) => {
        dispatch({
          type: Types.FETCH_GOAL,
          payload: response.data,
        })
      })
      .catch((error) => {
        handleErrors(error)
      })
  }

  const deleteGoalRequest = async (id) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
    await axiosClient
      .delete(`${process.env.REACT_APP_BACKEND_URL}api/financial_goal/${id}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 204) {
          dispatch({
            type: Types.DELETE_GOAL,
            payload: {
              id,
            },
          })
        }
      })
      .catch((error) => {
        handleErrors(error)
      })
  }

  const createGoalRequest = async (data) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
    try {
      await axiosClient
        .post(`${process.env.REACT_APP_BACKEND_URL}api/financial_goal/`, data, {
          headers,
        })
        .then((response) => {
          dispatch({
            type: Types.CREATE_GOAL,
            payload: {
              data: response.data.data,
            },
          })
        })
        .catch((error) => {
          handleErrors(error)
        })
    } catch (error) {}
  }

  const changeGoalRequest = async (goal) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
    try {
      await axiosClient
        .put(`${process.env.REACT_APP_BACKEND_URL}api/financial_goal/${goal.id}`, goal, {
          headers,
        })
        .then((response) => {
          dispatch({
            type: Types.EDIT_GOAL,
            payload: {
              goal: JSON.parse(response.config.data),
            },
          })
        })
        .catch((error) => {
          handleErrors(error)
        })
    } catch (error) {}
  }

  const UnitContext = React.createContext()
  const UnitUpdateContext = React.createContext()

  function useUnit() {
    return useContext(UnitContext)
  }

  function useUnitUpdate() {
    return useContext(UnitUpdateContext)
  }
  const [unit, setUnit] = useState('Months')

  const handleUnitChange = (val) => {
    setUnit(val)
  }

  return (
    <Context.Provider
      value={{
        authToken,
        setAuthToken,
        signOut,
        expenses,
        tags,
        weeklyExpense,
        monthlyExpenses,
        liabilities,
        incomeStatement,
        statusFeedback,
        goals,
        fetchGoals,
        createGoalRequest,
        deleteGoalRequest,
        changeGoalRequest,
        depreciation,
        giveFeedback,
        fetchTags,
        useUnit,
        useUnitUpdate,
        unit,
        handleUnitChange,
        fetchAllExpenses,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }
