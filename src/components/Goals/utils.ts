import { TableCellProps } from '@mui/material'

interface Column {
    id: string;
    label: string;
    align: TableCellProps['align']; // Limitado a las opciones permitidas
  }

export const columns : Column[] = [
    { id: 'goals', label: 'Goals', align: 'right' },
    {
        id: 'targetMetric',
        label: 'Target Metric',
        align: 'right',
    },
    {
        id: 'current',
        label: 'Current Metric',
        align: 'right',
    },
    {
        id: 'balance',
        label: 'Balance',
        align: 'right',
    },
    {
        id: 'reachablitiyInMonths',
        label: 'Reachability in Months',
        align: 'right',
    },
    {
        id: 'reachabilityInYears',
        label: 'Reachability in Years',
        align: 'right',
    },
    {
        id: 'started',
        label: 'Started',
        align: 'right',
    },
    {
        id: 'finished',
        label: 'Finished',
        align: 'right',
    },
    {
        id: 'plannedStart',
        label: 'Planned Start',
        align: 'right',
    },
    {
        id: 'plannedFinish',
        label: 'Planned Finish',
        align: 'right',
    },
    {
        id: 'comments',
        label: 'Comments',
        align: 'right',
    },
    {
        id: '',
        label: '',
        align: 'right',
    },
]
