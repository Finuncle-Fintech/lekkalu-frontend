import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithClient } from '@/__test__/utils'
import AddOrEditExpenseDialog from './AddOrEditExpenseDialog'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
}))

const Component = () => <AddOrEditExpenseDialog trigger={<div>Add Expense</div>} />

test('Add Expense button should be in the DOM', () => {
  const result = renderWithClient(<Component />)
  const addButton = result.getByText('Add Expense')
  expect(addButton).toBeInTheDocument()
})

test('Create a new expense', () => {
  const result = renderWithClient(<Component />)
  const addButton = result.getByText('Add Expense')
  fireEvent.click(addButton)
})
