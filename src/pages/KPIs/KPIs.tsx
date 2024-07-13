import { Link } from 'react-router-dom'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { KPIS } from '@/utils/query-keys'
import { fetchCustomKPIs } from '@/queries/goals'
import CustomKPICard from '@/pages/KPIs/Components/CustomKPICard'

export default function Goals() {
  const { data, isLoading, isFetching } = useQuery({ queryKey: [KPIS.KPIS], queryFn: fetchCustomKPIs })
  return (
    <div>
      <div className="text-4xl font-bold text-center mt-8 mb-4">Key Performance Indicators</div>
      <div className="text-sm text-center mt-4 mb-2">
        Create your own KPIs visually to track them later on your financial goals or to analyze outcomes of financial
        decisions
      </div>
      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Fetching...</p>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
        {data?.length ? (
          data?.map((custom_kpi) => (
            <CustomKPICard
              key={custom_kpi.id}
              id={custom_kpi.id}
              name={custom_kpi.name}
              description={custom_kpi.description}
            />
          ))
        ) : (
          <div>
            <p>You Have no financial goals.</p>
            <Link to="/goals/new" className="block underline mt-2">
              Click here to add.
            </Link>{' '}
          </div>
        )}
      </div>
    </div>
  )
}
