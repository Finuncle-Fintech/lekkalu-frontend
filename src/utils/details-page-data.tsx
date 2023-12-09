import React from 'react'

import { ArrowDownAZ, BookAudio, FileEdit, FileLock, LayoutList } from 'lucide-react'

// Expense & Budget Page
export const EXPENSE_BUDGET_FEATURES: { title: string; description: string; icon: React.ReactNode }[] = [
  {
    icon: <BookAudio size={50} />,
    title: 'Add Expense',
    description:
      'Easily record your expenses with essential details such as amount, tags, date, and even attach relevant images for documentation.',
  },
  {
    icon: <FileEdit size={50} />,
    title: 'Edit and Delete Budget',
    description:
      'Take control of your financial plan by editing or deleting budget entries as your financial goals and circumstances evolve.',
  },
  {
    icon: <FileLock size={50} />,
    title: 'Set Monthly Budget Limit',
    description:
      'Establish a realistic monthly budget limit to align your spending with your financial objectives. The tool allows you to set and adjust limits based on your income and financial priorities.',
  },
  {
    icon: <LayoutList size={50} />,
    title: 'Expense List',
    description:
      'Access a detailed list of your expenses, complete with pagination for convenient browsing. The tool provides a user-friendly interface for effortless navigation through your financial transactions.',
  },
  {
    icon: <ArrowDownAZ size={50} />,
    title: 'Date Range Filter',
    description:
      'Gain deeper insights into your spending patterns by filtering expenses based on specific date ranges. This feature enables you to analyze and understand your financial behavior over different periods.',
  },
]
