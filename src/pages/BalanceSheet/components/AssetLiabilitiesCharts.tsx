import React, { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts'
import { round } from 'lodash'
import { cn } from '@/utils/utils'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchLiabilities, fetchPhysicalAssets } from '@/queries/balance-sheet'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { PIE_CHART_COLORS, RADIAN } from '@/utils/constants'
// import { useUserPreferences } from '@/hooks/use-user-preferences'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function AssetLiabilitiesChart({ className, style }: Props) {
  const [physicalAssetsQ, liabilitiesQ] = useQueries({
    queries: [
      {
        queryKey: [BALANCE_SHEET.ASSETS],
        queryFn: fetchPhysicalAssets,
      },
      {
        queryKey: [BALANCE_SHEET.LIABILITIES],
        queryFn: fetchLiabilities,
      },
    ],
  })

  const chartData = useMemo(() => {
    if (!physicalAssetsQ.data || !liabilitiesQ.data) {
      return { assetsData: [], liabilitiesData: [] }
    }

    const totalAssetValue = physicalAssetsQ.data.reduce((acc, curr) => (acc += parseFloat(curr.market_value)), 0)
    const assetsData = physicalAssetsQ.data.map((asset) => {
      const assetValue = parseFloat(asset.market_value)
      return { ...asset, value: assetValue, percentage: round((assetValue * 100) / totalAssetValue, 2) }
    })

    const totalLiabilitiesValue = liabilitiesQ.data.reduce((acc, curr) => (acc += parseFloat(curr.balance)), 0)
    const liabilitiesData = liabilitiesQ.data.map((liability) => {
      const liabilityValue = parseFloat(liability.balance)
      return {
        ...liability,
        value: parseFloat(liability.balance),
        percentage: round((liabilityValue * 100) / totalLiabilitiesValue, 2),
      }
    })

    return { assetsData, liabilitiesData }
  }, [liabilitiesQ.data, physicalAssetsQ.data])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
    const radius = (Number(innerRadius) ?? 0) + (Number(outerRadius ?? 0) - Number(innerRadius ?? 0)) * 0.7

    const x = Number(cx ?? 0) + radius * Math.cos(-midAngle * RADIAN)
    const y = Number(cy ?? 0) + radius * Math.sin(-midAngle * RADIAN)

    if (!percent) {
      return null
    }

    if (percent * 100 > 3) {
      return (
        <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      )
    }

    return null
  }

  const CustomTooltip = ({ active, payload }: TooltipProps<number, number | string>) => {
    const { preferences } = useUserPreferences()
    const activePayload = payload?.[0]

    if (active && activePayload) {
      return (
        <div className='bg-white p-2 rounded-md border'>
          <label>
            {`${activePayload.name} : ` + activePayload?.payload.percentage + '%'}
            <br />
            {`${preferences.currencyUnit} ${numDifferentiation(activePayload.value ?? 0)} `}
          </label>
        </div>
      )
    }

    return null
  }

  if (physicalAssetsQ.isLoading || liabilitiesQ.isLoading) {
    return (
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='h-96 w-full bg-gray-200 animate-pulse' />
        <div className='h-96 w-full bg-gray-200 animate-pulse' />
        <div />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center flex-col md:flex-row gap-4 w-full', className)} style={style}>
      <div className='w-full flex items-center justify-center flex-col'>
        <div className='text-center'>Assets</div>
        <ResponsiveContainer width='100%' height={350}>
          <PieChart>
            <defs>
              {chartData.assetsData.map((_, index) => (
                <linearGradient id={`myGradient${index}`} key={`myGradient${index}`}>
                  <stop offset='0%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].start} />
                  <stop offset='100%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].end} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={chartData.assetsData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={120}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {chartData.assetsData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout='horizontal'
              verticalAlign='bottom'
              payload={chartData.assetsData.map((item, index) => {
                return {
                  id: item.name,
                  type: 'circle',
                  value: `${item.name} ${item.percentage} %`,
                  color: `url(#myGradient${index})`,
                }
              })}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='w-full flex items-center justify-center flex-col'>
        <div className='text-center'>Liabilities</div>
        <ResponsiveContainer width='100%' height={350}>
          <PieChart>
            <defs>
              {chartData.liabilitiesData.map((_, index) => (
                <linearGradient id={`myGradient${index}`} key={`myGradient${index}`}>
                  <stop offset='0%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].start} />
                  <stop offset='100%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].end} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={chartData.liabilitiesData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={120}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {chartData.liabilitiesData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout='horizontal'
              verticalAlign='bottom'
              align='center'
              payload={chartData.liabilitiesData.map((item, index) => {
                return {
                  id: item.name,
                  type: 'circle',
                  value: `${item.name} ${item.percentage} %`,
                  color: `url(#myGradient${index})`,
                }
              })}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function numDifferentiation(value: number) {
  let valueToReturn: string

  if (value >= 10000000) {
    valueToReturn = (value / 10000000).toFixed(2) + ' Cr'
  } else if (value >= 100000) {
    valueToReturn = (value / 100000).toFixed(2) + ' Lac'
  } else if (value >= 1000) {
    valueToReturn = (value / 1000).toFixed(2) + ' K'
  } else {
    valueToReturn = value.toFixed(2)
  }

  return valueToReturn
}
