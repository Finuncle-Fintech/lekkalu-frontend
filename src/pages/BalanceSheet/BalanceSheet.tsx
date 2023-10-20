import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Page from '@/components/Page/Page'
import AssetsTable from './components/AssetsTable'
import LiabilitiesTable from './components/LiabilitiesTable'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchLiabilities, fetchPhysicalAssets } from '@/queries/balance-sheet'

// @ts-expect-error (no-type-definitions)
import GraphCard from '@/components/BalanceSheet/GraphCard'
// @ts-expect-error (no-type-definitions)
import BarGraph from '@/components/BalanceSheet/BarGraph'

export default function BalanceSheet() {
  const { data: physicalAssets } = useQuery([BALANCE_SHEET.ASSETS], fetchPhysicalAssets)
  const { data: liabilities } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities)

  const [barGraphIsOpen, setBarGraphIsOpen] = useState(false)

  const assetsData = useMemo(() => {
    if (!physicalAssets) {
      return {}
    }

    const totalVal = physicalAssets.reduce((acc, curr) => (acc += parseFloat(curr.market_value)), 0.00001)
    const finalAssets = physicalAssets.map((asset) => ({ ...asset, value: parseFloat(asset.market_value) }))

    return { totalVal, finalAssets }
  }, [physicalAssets])

  const liabilitiesData = useMemo(() => {
    if (!liabilities) {
      return {}
    }

    const totalVal = liabilities.reduce((acc, curr) => (acc += parseFloat(curr.balance)), 0.00001)
    const finalLiabilities = liabilities.map((liability) => ({
      ...liability,
      value: parseFloat(liability.balance),
      principal: parseFloat(liability.principal),
      interest: parseFloat(liability.interest_rate),
      tenure: liability.tenure,
      closure_charges: parseFloat(liability.closure_charges),
      disbursement_date: liability.disbursement_date,
    }))

    return { totalVal, finalLiabilities }
  }, [liabilities])

  const handleOpen = () => {
    setBarGraphIsOpen(true)
  }
  const handleClose = () => {
    setBarGraphIsOpen(false)
  }

  return (
    <Page>
      <GraphCard assetDatas={assetsData} liabilityDatas={liabilitiesData} setBarGraphIsOpen={handleOpen} />
      <div className='text-2xl font-bold my-2'>Assets</div>
      <AssetsTable />

      <BarGraph
        setBarGraphIsOpen={handleClose}
        barGraphIsOpen={barGraphIsOpen}
        dataAsset={assetsData}
        dataLiability={liabilitiesData.finalLiabilities}
      />

      <div className='text-2xl font-bold my-2'>Liabilities</div>
      <LiabilitiesTable />
    </Page>
  )
}
