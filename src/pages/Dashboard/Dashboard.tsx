import React from 'react'

import Page from '@/components/Page/Page'
import { WeeklyChart } from '../../components/Charts/WeeklyChart'
import { SpentBalanceChart } from '../../components/Charts/SpentBalanceChart'
import { CumSumChart } from '../../components/Charts/CumSumChart'
import AssetDepreciationChart from '@/components/Charts/AssetDepreciationChart'
import BudgetChart from '@/components/Charts/BudgetChart'

const Home = () => {
  return (
    <Page className='grid md:grid-cols-2 gap-4'>
      <WeeklyChart />
      <SpentBalanceChart />
      <CumSumChart />
      <AssetDepreciationChart />
      <BudgetChart />
    </Page>
  )
}

export default Home
