/* eslint-disable no-console */
import { gql } from 'graphql-request'
import { AddGoalSchema } from '@/schema/goals'
import {
  Goal,
  GoalProportionalityType,
  KpiType,
  Timeline,
  CustomKPI,
  GoalResponseType,
  GoalsResponseType,
} from '@/types/goals'
import { v1ApiClient, v2ApiClient } from '@/utils/client'
import { AddCustomKPISchema } from '@/schema/custom_kpi'
import { getGraphQLClient } from '@/utils/graphql-client'

// TODO: delete rest api for goals.
export async function fetchGoals() {
  const { data } = await v2ApiClient.get<Goal[]>('financial_goal/')
  return data
}

export async function fetchGoalsWithGraphql() {
  const docs = gql`
    query MyQuery {
      financialGoals {
        id
        createdAt
        name
        met
        trackKpi
        targetValue
        targetDate
        reachableByDays
      }
    }
  `
  const client = getGraphQLClient('GET')
  const data = client.request<GoalsResponseType>(docs)
  return data
}

export async function fetchUserCustomKPIs() {
  const { data } = await v1ApiClient.get<CustomKPI[]>('user_custom_kpi/')
  return data
}

export async function fetchCustomKPIs() {
  const { data } = await v1ApiClient.get<CustomKPI[]>('custom_kpi/')
  return data
}

export async function deleteCustomKPI(id: number) {
  const { data } = await v1ApiClient.delete(`user_custom_kpi/${id}`)
  return data
}

export async function addCustomKPI(dto: AddCustomKPISchema) {
  const { data } = await v1ApiClient.post('user_custom_kpi/', dto)
  return data
}

export async function editCustomKPI(id: number, dto: Partial<AddGoalSchema>) {
  const { data } = await v1ApiClient.put(`user_custom_kpi/${id}`, dto)
  return data
}

export async function fetchCustomKPIDetails(id: number) {
  const { data } = await v1ApiClient.get<CustomKPI>(`custom_kpi/${id}`)
  return data
}

export async function fetchUserCustomKPIDetails(id: number) {
  const { data } = await v1ApiClient.get<CustomKPI>(`user_custom_kpi/${id}`)
  return data
}

export async function addGoal(dto: AddGoalSchema) {
  const { data } = await v2ApiClient.post('financial_goal/', dto)
  return data
}

export async function addGoalWithGraphql() {
  const docs = gql`
    mutation {
      createFinancialGoal(
        name: "New Test Goal using graphql"
        customKpiContentType: "customkpi"
        customKpiObjectId: 2
        targetValue: 1
        goalProportionality: "HigherTheBetter"
      ) {
        financialGoal {
          id
          contentType
          objectId
          relatedObject {
            ... on UserCustomKPIType {
              idf
              name
              description
            }
            ... on CustomKPIType {
              id
              name
            }
          }
        }
      }
    }
  `
  const client = getGraphQLClient('POST')
  const data = await client.request<any>(docs)
  console.log('hello world', data)
  return data
}

export async function editGoal(id: number, dto: Partial<AddGoalSchema>) {
  const { data } = await v1ApiClient.put(`financial_goal/${id}`, dto)
  return data
}

export async function deleteGoal(id: number) {
  const { data } = await v1ApiClient.delete(`financial_goal/${id}`)
  return data
}

export async function deleteGoalWithGraphql(id: number) {
  const docs = gql`
    mutation {
      deleteFinancialGoal(id: ${id}) {
        success
      }
    }
  `
  const client = getGraphQLClient('POST')
  const data = await client.request<GoalResponseType>(docs)
  return data.financialGoals
}

export async function getGoalProgress(id: number) {
  const { data } = await v2ApiClient.get<{ name: string; progress_percent: number }>(`financial_goal/progress/${id}`)
  return data
}

export async function fetchGoalDetails(id: number) {
  const { data } = await v2ApiClient.get<Goal>(`financial_goal/${id}`)
  return data
}

export async function fetchGoalsDetailsWithGraphql(id: number) {
  const docs = gql`
    query MyQuery {
      financialGoal(id: ${id}) {
        id
        createdAt
        name
        met
        trackKpi
        targetValue
        targetDate
        reachableByDays
      }
    }
  `
  const client = getGraphQLClient('GET')
  const data = await client.request<GoalResponseType>(docs)
  return data
}

export async function fetchGoalTimeline(id: number) {
  const { data } = await v2ApiClient.get<Timeline[]>(`financial_goal/timeline/${id}`)
  return data
}

export async function fetchGoalProportionalityTypes() {
  const { data } = await v2ApiClient.get<GoalProportionalityType[]>('financial_goal/goal_proportionality_type')
  return data
}

export async function fetchKPITypes() {
  const { data } = await v2ApiClient.get<KpiType[]>('financial_goal/kpis_type')
  return data
}
