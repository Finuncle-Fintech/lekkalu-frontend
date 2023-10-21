/* eslint-disable */

import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { Context } from '@/provider/Provider'
import GraphCard from '@/components/BalanceSheet/GraphCard'
import BarGraph from '@/components/BalanceSheet/BarGraph'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchPhysicalAssets } from '@/queries/balance-sheet'
import When from '../../components/When/When'

export default function BalanceSheet() {
  const { liabilities } = useContext(Context)
  // assets
  const { data: physical_assets, isLoading } = useQuery([BALANCE_SHEET.ASSETS], fetchPhysicalAssets)

  const [barGraphIsOpen, setBarGraphIsOpen] = useState(false)
  // const [assetDatas, setAssetDatas] = useState(physical_assets)
  const [liabilityDatas, setLiabilityDatas] = useState([])

  const assetDatas = useMemo(() => {
    let totalVal = 0.00001
    let finalAssets = []
    if (physical_assets?.length > 0) {
      physical_assets.forEach((da) => {
        totalVal += parseFloat(da.market_value)
        finalAssets = [...finalAssets, { id: da.id, name: da.name, value: parseFloat(da.market_value) }]
      })
    }
    return { finalAssets, totalVal }
  }, [physical_assets, isLoading])

  useEffect(() => {
    if (liabilities.finalLiabilities && liabilities.finalLiabilities.length > 0) {
      const newLiabilityDatas = liabilities.finalLiabilities.map((liability) => ({
        id: liability.id,
        label: liability.name,
        value: liability.value,
        principal: liability.principal,
        interest: liability.interest,
        tenure: liability.tenure,
        closure_charges: liability.closure_charges,
        disbursement_date: liability.disbursement_date,
      }))
      setLiabilityDatas(newLiabilityDatas)
    }
  }, [liabilities])

  const handleOpen = () => {
    setBarGraphIsOpen(true)
  }
  const handleClose = () => {
    setBarGraphIsOpen(false)
  }

  return (
    <When truthy={Boolean(assetDatas.finalAssets.length > 0)}>
      <Box
        sx={{
          minHeight: '350vh',
          backgroundColor: 'primary.main',
          padding: '1% 5% 0 5%',
        }}
      >
        <GraphCard assetDatas={assetDatas} liabilityDatas={liabilities} setBarGraphIsOpen={handleOpen} />
        {barGraphIsOpen ? (
          <BarGraph
            setBarGraphIsOpen={handleClose}
            barGraphIsOpen={barGraphIsOpen}
            dataAsset={assetDatas}
            dataLiability={liabilityDatas}
          />
        ) : null}
      </Box>
    </When>
  )
}
