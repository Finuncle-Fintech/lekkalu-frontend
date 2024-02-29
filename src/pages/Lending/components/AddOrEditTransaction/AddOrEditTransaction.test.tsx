import React from 'react'
import { renderWithClient } from '@/__test__/utils'
import AddOrEditTransaction from './AddOrEditTransaction'
import { Button } from '@/components/ui/button'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
}))

const Component = () => (
  <AddOrEditTransaction
    trigger={
      <Button variant='ghost' size='sm'>
        Add Transaction
      </Button>
    }
  />
)

test('Add Transaction button should be in the DOM', () => {
  const result = renderWithClient(<Component />)
  const addButton = result.getByText('Add Transaction')
  expect(addButton).toBeInTheDocument()
})
