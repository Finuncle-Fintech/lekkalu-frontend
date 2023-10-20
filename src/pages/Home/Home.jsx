import React, { useEffect, useContext } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import Colors from '@/constants/colors'

import { Context } from '@/provider/Provider'
import { WeeklyChart } from '../../components/Charts/WeeklyChart'
import { SpentBalanceChart } from '../../components/Charts/SpentBalanceChart'
import { CumSumChart } from '../../components/Charts/CumSumChart'
import AssetsdepreciationChart from '../../components/Charts/AssetsDepreciationsChart'

const Home = () => {
  const { weeklyExpense, fetchData, monthlyExpenses, depreciation } = useContext(Context)

  const fetchAPI = async () => {
    await fetchData().then(() => {})
  }
  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      {monthlyExpenses.length === 0 && weeklyExpense.length === 0 ? (
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
        <div
          className='mt-3'
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WeeklyChart data={weeklyExpense} />
          <SpentBalanceChart data={monthlyExpenses} />
          <CumSumChart data={monthlyExpenses} />
          <AssetsdepreciationChart data={depreciation} />
        </div>
      )}
    </div>
  )
}

export default Home
