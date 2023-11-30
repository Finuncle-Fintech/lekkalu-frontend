import { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'

export const GOAL_INPUTS: InputField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    id: 'target_value',
    label: 'Target Value',
    type: 'number',
  },
  {
    id: 'track_kpi',
    label: 'Track KPI',
    type: 'select',
    options: [{ id: 'LiabilityPercent', label: 'Liability Percent' }],
  },
]

export const GOAL_CATEGORIES = [
  {
    id: 'ASSET_QUALITY',
    label: 'Asset Quality',
  },
  {
    id: 'LIABILITIES',
    label: 'Liabilities',
  },
  {
    id: 'BALANCE_SHEET',
    label: 'Balance Sheet',
  },
  {
    id: 'INCOME_STATEMENT',
    label: 'Income Statement',
  },
] as const

export type GoalCategories = (typeof GOAL_CATEGORIES)[number]['id']

export const CATEGORY_CALCULATION_MAP: Record<GoalCategories, Array<{ id: string; label: string }>> = {
  ASSET_QUALITY: [
    {
      id: 'LENT',
      label: 'Lent',
    },
    {
      id: 'NPA',
      label: 'NPA',
    },
  ],
  BALANCE_SHEET: [
    {
      id: 'EQUITY',
      label: 'Equity',
    },
    {
      id: 'NET_CASH',
      label: 'Net Cash',
    },
    {
      id: 'NET_DEBT',
      label: 'Net Debt',
    },
  ],
  INCOME_STATEMENT: [
    {
      id: 'INVESTMENT',
      label: 'Investment',
    },
    {
      id: 'ALPHA',
      label: 'Alpha',
    },
    {
      id: 'CHARITY',
      label: 'Charity',
    },
  ],
  LIABILITIES: [
    {
      id: 'GROSS_DEBT',
      label: 'Gross Debt',
    },
  ],
}

// * These fields are on hold for now
// {
//   id: 'target_metric',
//   label: 'Target Metric',
//   type: 'number',
// },
// {
//   id: 'current_metric',
//   label: 'Current Metric',
//   type: 'number',
// },
// {
//   id: 'reachability_in_months',
//   label: 'Reachability in Months',
//   type: 'number',
// },
// {
//   id: 'reachability_in_years',
//   label: 'Reachability in Years',
//   type: 'number',
// },
// {
//   id: 'started',
//   label: 'Choose the Started Date',
//   type: 'date',
// },
// {
//   id: 'finished',
//   label: 'Choose the Finished Date',
//   type: 'date',
// },
// {
//   id: 'planned_start',
//   label: 'Choose the Planned Start Date',
//   type: 'date',
// },
// {
//   id: 'planned_finish',
//   label: 'Choose the Planned Finish Date',
//   type: 'date',
// },
// {
//   id: 'comments',
//   label: 'Provide comments for goal',
//   type: 'text',
// },
// {
//   id: 'balance',
//   label: 'Balance',
//   type: 'number',
// },
// {
//   id: 'prefered_value_of_balance',
//   label: 'Choose preferred value of Balance',
//   type: 'radio',
//   options: [
//     { id: 'H', label: 'High' },
//     { id: 'L', label: 'Low' },
//   ],
// },
