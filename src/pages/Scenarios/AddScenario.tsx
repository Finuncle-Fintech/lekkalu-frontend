import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { AxiosInstance } from 'axios'
import Page from '@/components/Page/Page'
import PageTitle from '@/components/DetailPageHeading'
import { AddScenarioSchemas, addScenarioSchemas } from '@/schema/scenarios'
import ScenarioForm from './components/Form'
import { createScenarios } from '@/queries/scenarios'
import { toast } from '@/components/ui/use-toast'
import { useImaginaryAuth } from './context/use-imaginaryAuth'
import { AddGoalSchema } from '@/schema/goals'
import { loginImaginaryUser } from '@/queries/auth'

const ONE_YEAR_LATER = dayjs().add(1, 'year').toISOString().split('T')[0]

const AddScenario = () => {
  const navigate = useNavigate()
  const form = useForm<AddScenarioSchemas>({
    resolver: zodResolver(addScenarioSchemas),
  })

  const { getAPIClientForImaginaryUser } = useImaginaryAuth()

  async function addGoal(dto: AddGoalSchema, apiClient: AxiosInstance) {
    const { data } = await apiClient.post('financial_goal/', dto)
    return data
  }

  const { mutate: login, isPending: isLoginImaginaryUser } = useMutation({ mutationFn: loginImaginaryUser })
  const { mutate: createGoalForImaginaryUser, isPending: isCreatingGoalForImaginaryUser } = useMutation({
    mutationFn: (apiClient: AxiosInstance) =>
      addGoal(
        {
          name: `${Math.random()}-goal`,
          goal_proportionality: 'HigherTheBetter',
          track_kpi: 'NetWorth',
          target_value: 1,
          target_date: ONE_YEAR_LATER,
        },
        apiClient,
      ),
  })

  const { mutate: addScenario, isPending: isAddingScenario } = useMutation({
    mutationFn: createScenarios,
    onSuccess: (data) => {
      toast({ title: 'Scenario created successfully!' })
      login(
        { username: data.imag_username, password: data.imag_password, id: data.id },
        {
          onSuccess: (logginInfo) => {
            const apiClient = getAPIClientForImaginaryUser(logginInfo.access, 'v2')
            createGoalForImaginaryUser(apiClient, {
              onSuccess: () => {
                navigate(`/scenarios/${data.id}`)
              },
            })
          },
        },
      )
    },
    onError: (response: any) => {
      const message = response?.response?.data?.message
      message && toast({ title: message })
    },
  })

  const handleFormSubmit = (values: AddScenarioSchemas) => {
    addScenario(values)
  }

  return (
    <Page className='space-y-8'>
      <PageTitle title='Create a scenario' backUrlTitle='Back to Scenarios' />
      <ScenarioForm
        form={form}
        isLoading={isAddingScenario || isLoginImaginaryUser || isCreatingGoalForImaginaryUser}
        onSubmit={handleFormSubmit}
      />
    </Page>
  )
}

export default AddScenario
