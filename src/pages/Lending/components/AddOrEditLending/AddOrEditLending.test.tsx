import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithClient } from '@/__test__/utils'
import AddOrEditLending from './AddOrEditLending'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
}))

const Component = () => <AddOrEditLending trigger={<div>Add Account</div>} />

test('Add Lending button should be in the DOM', () => {
  const result = renderWithClient(<Component />)
  const addButton = result.getByText('Add Account')
  expect(addButton).toBeInTheDocument()
})

test('Create a new account', () => {
  const result = renderWithClient(<Component />)
  const addButton = result.getByText('Add Account')
  fireEvent.click(addButton)
})
