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
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Key Performance
              Indicators</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Create your own KPIs visually to track them
              later on your financial goals or to analyze outcomes of financial
              decisions.</p>
          </div>
          <button
            className="flex mx-auto mt-4 mb-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add
            KPI
          </button>
          {isLoading && <p>Loading...</p>}
          {isFetching && <p>Fetching...</p>}
          <div className="flex flex-wrap -m-4">
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
      </section>
    </div>
  )
}
