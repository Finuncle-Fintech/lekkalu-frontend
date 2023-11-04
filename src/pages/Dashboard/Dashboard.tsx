import React from 'react'

import { WeeklyChart } from '../../components/Charts/WeeklyChart'
import { SpentBalanceChart } from '../../components/Charts/SpentBalanceChart'
import { CumSumChart } from '../../components/Charts/CumSumChart'
import Page from '@/components/Page/Page'
import AssetDepreciationChart from '@/components/Charts/AssetDepreciationChart'
import Budgets from '@/components/Budgets'

const Home = () => {
  return (
    <Page className='grid md:grid-cols-2 gap-4'>
      <WeeklyChart />
      <SpentBalanceChart />
      <CumSumChart />
      <AssetDepreciationChart />
      <Budgets/>
    </Page>
  )
}

export default Home
