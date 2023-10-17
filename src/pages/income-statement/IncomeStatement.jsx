import Colors from 'constants/colors'
import React, { useContext, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import IncomeStatementSummary from '@/components/income-statement/summary/IncomeStatementSummary'
import Income from '@/components/income-statement/income/Income'
import { Expenses } from '@/components/income-statement/expenses/Expenses'
import { Context } from '@/provider/Provider'

const IncomeStatement = () => {
  const { fetchIncomeStatement, incomeStatement } = useContext(Context)
  const [currentab] = React.useState(0)

  useEffect(() => {
    fetchIncomeStatement()
  }, [])

  const loadCurrentTab = () => {
    switch (currentab) {
      case 0: {
        return (
          <IncomeStatementSummary
            incomeStatement={incomeStatement}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            difference={difference}
          />
        )
      }
      case 1: {
        return <Income incomeStatement={incomeStatement} totalIncome={totalIncome} />
      }
      case 2: {
        return <Expenses incomeStatement={incomeStatement} totalExpense={totalExpense} />
      }
      default:
        return null
    }
  }

  const totalIncome = incomeStatement.income.reduce((total, item) => total + item.value, 0)

  const totalExpense = incomeStatement.expenses.reduce((total, item) => total + item.value, 0)
  const difference = totalIncome - totalExpense
  return (
    <div>
      {/* <GenericTabs
        tabs={tabsList}
        handleChange={handleTabChange}
        value={currentab}
      /> */}
      {incomeStatement.income.length === 0 && incomeStatement.expenses.length === 0 ? (
        <div
          className='section col-md-8 mx-auto pb-5 pt-5 mt-5'
          style={{
            backgroundColor: Colors.graphBG,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BeatLoader stylecolor={Colors.loaderColor} />
        </div>
      ) : (
        <div>{loadCurrentTab()}</div>
      )}
    </div>
  )
}

export default IncomeStatement
