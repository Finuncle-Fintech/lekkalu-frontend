import React from 'react'
import {
  CalculatorIcon,
  CoinsIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  SheetIcon,
  TargetIcon,
} from 'lucide-react'

type Route = { path: string; label: string; icon: React.ReactElement<{ className?: string }> }

export const ROUTES: Array<Route> = [
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

export const CALCULATOR_ROUTES: Array<Route> = [
  {
    path: '/sip-calculator',
    label: 'SIP Calculator',
    icon: <CalculatorIcon />,
  },
  {
    path: '/cagr-calculator',
    label: 'CAGR Calculator',
    icon: <CalculatorIcon />,
  },
  {
    path: '/emi-calculator',
    label: 'EMI Calculator',
    icon: <CalculatorIcon />,
  },
]
