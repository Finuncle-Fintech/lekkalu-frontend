import React from 'react'
import { ArrowDownAZ, BookAudio, FileEdit, FileLock, LayoutList } from 'lucide-react'
import addExpense from '@/assets/add-expense.json'
import editDeleteBudget from '@/assets/edit-delete-budget.json'
import budgetLimit from '@/assets/budget-limit.json'
import listingExpense from '@/assets/listing-expense.json'
import rangeFilter from '@/assets/date-range-filter.json'

// Expense & Budget Page
export const EXPENSE_BUDGET_FEATURES: {
  title: string
  description: string
  icon: React.ReactNode
  animation: any
  subTitle: string
}[] = [
  {
    icon: <BookAudio size={50} />,
    title: 'Add Expense',
    description:
      'Easily record your expenses with essential details such as amount, tags, date, and even attach relevant images for documentation.',
    animation: addExpense,
    subTitle: 'Expense Tracker',
  },
  {
    icon: <FileEdit size={50} />,
    title: 'Edit and Delete Budget',
    description:
      'Take control of your financial plan by editing or deleting budget entries as your financial goals and circumstances evolve.',
    animation: editDeleteBudget,
    subTitle: 'Financial Control',
  },
  {
    icon: <FileLock size={50} />,
    title: 'Set Monthly Budget Limit',
    description:
      'Establish a realistic monthly budget limit to align your spending with your financial objectives. The tool allows you to set and adjust limits based on your income and financial priorities.',
    animation: budgetLimit,
    subTitle: 'Budget Planning',
  },
  {
    icon: <LayoutList size={50} />,
    title: 'Expense List',
    description:
      'Access a detailed list of your expenses, complete with pagination for convenient browsing. The tool provides a user-friendly interface for effortless navigation through your financial transactions.',
    animation: listingExpense,
    subTitle: 'Transaction Overview',
  },
  {
    icon: <ArrowDownAZ size={50} />,
    title: 'Date Range Filter',
    description:
      'Gain deeper insights into your spending patterns by filtering expenses based on specific date ranges. This feature enables you to analyze and understand your financial behavior over different periods.',
    animation: rangeFilter,
    subTitle: 'Data Analysis',
  },
]
