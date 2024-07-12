import React, { useMemo } from 'react'
import Chart from 'react-apexcharts'
import { useQuery } from '@tanstack/react-query'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchPhysicalAssets } from '@/queries/balance-sheet'
import { calculateDeprecationData } from '@/utils/balance-sheet'
import { formatIndianMoneyNotation } from '@/utils/format-money'

export default function AssetDepreciationChart() {
  const { data, isLoading } = useQuery({
    queryKey: [BALANCE_SHEET.ASSETS],
    queryFn: fetchPhysicalAssets,
  })
  const { preferences } = useUserPreferences()

  const depreciationData = useMemo(() => {
    if (!data) {
      return []
    }

    return calculateDeprecationData(data).filter((obj) => {
      return obj.value !== null && !isNaN(obj.value) && isFinite(obj.value)
    })
  }, [data])

  if (isLoading) {
    return <div className='w-full animate-pulse bg-gray-300 h-96' />
  }

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      foreColor: '#000',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '60%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: depreciationData.map((item) => item.date.slice(0, 3)),
    },
    yaxis: {
      labels: {
        formatter: (value) => `${preferences.currencyUnit} ${formatIndianMoneyNotation(value, 1)}`,
      },
    },
  }
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'Value',
      type: 'bar',
      data: depreciationData.map((item) => item.value),
    },
  ]

  return (
    <div className='border p-4 w-full'>
      <h3 className='text-lg text-center'>Assets depreciation</h3>

      <Chart options={chartOptions} series={chartSeries} type='bar' height={320} />
    </div>
  )
}
