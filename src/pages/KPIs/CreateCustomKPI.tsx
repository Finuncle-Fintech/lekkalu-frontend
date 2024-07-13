import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import CustomKPIFlow from '@/pages/KPIs/Components/CustomKPIFlow'

export default function CreateCustomKPI() {
  return (
    <div>
      <Link className="flex items-center ml-10 mt-4 gap-2 text-muted-foreground" to="/kpis">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to KPIs
      </Link>
      <CustomKPIFlow />
    </div>
  )
}
