import React from 'react'

import { CoinsIcon, DollarSignIcon, LayoutDashboardIcon, Settings2Icon, SheetIcon, TargetIcon } from 'lucide-react'

export const ROUTES: Array<{ path: string; label: string; icon: React.ReactElement<{ className?: string }> }> = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon />,
  },
  {
    path: '/goals',
    label: 'Goals',
    icon: <TargetIcon />,
  },
  {
    path: '/income-statement',
    label: 'Income Statement',
    icon: <DollarSignIcon />,
  },
  {
    path: '/expenses',
    label: 'Expenses',
    icon: <CoinsIcon />,
  },
  {
    path: '/balance-sheet',
    label: 'Balance Sheet',
    icon: <SheetIcon />,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <Settings2Icon />,
  },
]
