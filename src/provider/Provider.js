import React, { createContext, useReducer, useState, useContext } from 'react'
import jwtDecode from 'jwt-decode'
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
  let finalDataWeekly = []
  let finalLiabilities = []
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let weekData = []

  const {
    statusFeedback,
    expenses,
    tags,
    weeklyExpense,
    monthlyExpenses,
    liabilities,
    incomeStatement,
    depreciation,
    user,
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

  const createTag = async (tag) => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      await axiosPrivate.post(`${process.env.REACT_APP_BACKEND_API}expense-tag/`, tag, {
        headers,
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

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      await axiosPrivate
        .get(`${process.env.REACT_APP_BACKEND_API}weekly_expenses/`, {
          headers,
        })
        .then((res) => {
          weekData = res.data
          let totlamount = 0
          let i = 0
          weekData.forEach((da) => {
            totlamount += weekData[i]?.total_amount
            if (finalDataWeekly.length >= 4) {
              finalDataWeekly = [
                ...finalDataWeekly,
                {
                  time: da.week.toString() + '_' + da.year.toString(),
                  amount: da?.total_amount,
                  roll_avg: parseFloat((totlamount / 5).toFixed(2)),
                },
              ]
              totlamount = totlamount - weekData[i - 4].total_amount
            } else {
              finalDataWeekly = [
                ...finalDataWeekly,
                {
                  time: da.week.toString() + ' ' + da.year.toString(),
                  amount: da?.total_amount,
                },
              ]
            }
            i += 1
          })
          dispatch({
            type: Types.FETCH_WEEKLY_EXPENSE,
            payload: finalDataWeekly,
          })
        })

      await axiosPrivate.get(`${process.env.REACT_APP_BACKEND_API}loans/`, { headers }).then((res) => {
        let totalVal = 0.000000001
        res.data.forEach((da) => {
          totalVal += parseFloat(da.balance)
          finalLiabilities = [
            ...finalLiabilities,
            {
              id: da.id,
              name: da.name,
              value: parseFloat(da.balance),
              principal: parseFloat(da.principal),
              interest: parseFloat(da.interest_rate),
              tenure: da.tenure,
              closure_charges: parseFloat(da.closure_charges),
              disbursement_date: da.disbursement_date,
            },
          ]
        })
        dispatch({
          type: Types.FETCH_LIABILITIES,
          payload: { finalLiabilities, totalVal },
        })
      })
      await axiosPrivate
        .get(`${process.env.REACT_APP_BACKEND_API}monthly_expenses/`, {
          headers,
        })
        .then((res) => {
          let finalMonthlyExp = []
          const response = res.data
          response.forEach((da) => {
            finalMonthlyExp = [
              ...finalMonthlyExp,
              {
                name: monthNames[da.month - 1],
                Spent: da.spent,
                Balance: da.balance,
                CumSum: da.cum_sum,
              },
            ]
          })

          dispatch({
            type: Types.FETCH_MONTHLY_EXPENSE,
            payload: finalMonthlyExp,
          })
        })

      await axiosPrivate
        .get(`${process.env.REACT_APP_BACKEND_API}physical_assets/`, {
          headers,
        })
        .then((res) => {
          const data = res.data

          dispatch({
            type: Types.FETCH_depreciation,
            payload: data,
          })
        })
    } catch (error) {
      handleErrors(error.message)
    }
  }

  // const fetchLiabilities = async () => {
  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //       'Content-Type': 'application/json',
  //     }

  //     await axiosPrivate.get(`${process.env.REACT_APP_BACKEND_API}loans/`, { headers }).then((res) => {
  //       let totalVal = 0.000000001

  //       res.data.forEach((da) => {
  //         totalVal += parseFloat(da.balance)

  //         finalLiabilities = [
  //           ...finalLiabilities,
  //           {
  //             id: da.id,
  //             name: da.name,
  //             value: parseFloat(da.balance),
  //             principal: parseFloat(da.principal),
  //             interest: parseFloat(da.interest_rate),
  //             tenure: da.tenure,
  //             closure_charges: parseFloat(da.closure_charges),
  //             disbursement_date: da.disbursement_date,
  //           },
  //         ]
  //       })
  //       dispatch({
  //         type: Types.FETCH_LIABILITIES,
  //         payload: { finalLiabilities, totalVal },
  //       })
  //     })
  //   } catch (error) {
  //     // Handle errors
  //     // handleErrors(error.message);
  //     console.log(error)
  //   }
  // }

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

  const fetchUser = async (authToken) => {
    if (!authToken) return

    const decodedToken = jwtDecode(authToken)
    const userId = decodedToken.user_id

    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      const response = await axiosPrivate.get(`${process.env.REACT_APP_BACKEND_URL}users/api/users/${userId}`, {
        headers,
      })

      if (response.status === 200) {
        dispatch({ type: Types.SET_USER, payload: response.data })
      }
    } catch (error) {
      handleErrors(error)
    }
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
        fetchData,
        fetchTags,
        createTag,
        useUnit,
        useUnitUpdate,
        unit,
        handleUnitChange,
        fetchAllExpenses,
        fetchUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }
