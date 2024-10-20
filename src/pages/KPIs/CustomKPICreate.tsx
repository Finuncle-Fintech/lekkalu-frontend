import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import CustomKPIFlow from '@/pages/KPIs/Components/CustomKPIFlow'
import Page from '@/components/Page/Page'
import { toast } from '@/components/ui/use-toast'
import Form from '@/pages/KPIs/Components/Form'
import { AddCustomKPISchema, addCustomKPISchema } from '@/schema/custom_kpi'
import { addCustomKPI } from '@/queries/goals'
import { getSearchParamFromLocationSearch } from '@/utils/utils'

export default function CustomKPICreate() {
  const navigate = useNavigate()
  const [latexEquation, setLatexEquation] = useState<string>('')
  const [isCustomKPIFlowVisible, setIsCustomKPIFlowVisible] = useState(true)
  const location = useLocation()

  const createCustomKPIMutation = useMutation({
    mutationFn: addCustomKPI,
    onSuccess: (data) => {
      const query: any = getSearchParamFromLocationSearch(location.search)
      if (query.edit_goal === 'true' || query.new_goal === 'true') {
        const updated_query = { ...query, custom_kpi: data.id }
        navigate(
          `/goals?${Object.entries(updated_query)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`,
          { replace: true },
        )
      } else {
        toast({ title: 'Goal created successfully!' })
        navigate('/kpis')
      }
    },
    onError: (response: any) => {
      const message = response?.response?.data?.message
      message && toast({ title: message })
    },
  })

  const form = useForm<AddCustomKPISchema>({
    resolver: zodResolver(addCustomKPISchema),
    defaultValues: {
      latex: '',
    },
  })

  const handleCustomKPICreate = (values: AddCustomKPISchema) => {
    createCustomKPIMutation.mutate(values)
  }

  React.useEffect(() => {
    form.setValue('latex', latexEquation)
  }, [latexEquation, form])

  return (
    <Page>
      <Link className='flex items-center ml-10 mt-4 gap-2 text-muted-foreground' to='/kpis'>
        <ArrowLeftIcon className='w-4 h-4' />
        Back to KPIs
      </Link>
      <Form
        isCustomKPIFlowVisible={isCustomKPIFlowVisible}
        setIsCustomKPIFlowVisible={setIsCustomKPIFlowVisible}
        form={form}
        onSubmit={handleCustomKPICreate}
        isLoading={createCustomKPIMutation.isPending}
      />
      {isCustomKPIFlowVisible && <CustomKPIFlow setLatexEquation={setLatexEquation} />}
    </Page>
  )
}
