import React from 'react'
// import { useQuery } from '@tanstack/react-query'
import Page from '@/components/Page/Page'
import AssetsTable from './components/AssetsTable'
// import { BALANCE_SHEET } from '@/utils/query-keys'
// import { fetchPhysicalAssets } from '@/queries/physical_assets'

export default function BalanceSheet() {
  //   const { data: physicalAssets } = useQuery([BALANCE_SHEET.ASSETS], fetchPhysicalAssets)

  //   const graphData = useMemo(() => {
  //     if (!physicalAssets) {
  //       return {}
  //     }

  //     const totalMarketValue = physicalAssets.reduce((acc, curr) => (acc += parseFloat(curr.market_value)), 0.00001)
  //     const finalAssets = physicalAssets.map((asset) => ({ ...asset, value: parseFloat(asset.market_value) }))

  //     return { totalMarketValue, finalAssets }
  //   }, [physicalAssets])

  return (
    <Page>
      {/* <GraphCard assetDatas={graphData.finalAssets} liabilityDatas={liabilities} setBarGraphIsOpen={handleOpen} /> */}
      <AssetsTable />
    </Page>
  )
}
