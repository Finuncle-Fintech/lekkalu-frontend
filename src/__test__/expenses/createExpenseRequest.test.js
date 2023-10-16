import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import Expenses from '@/components/Expenses/Expenses'
import { mockState } from '@/__test__/data/Expenses'
import { Context } from '@/provider/Provider'
import { queryClient } from '@/utils/client'

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
}))
jest.mock('@/hooks/useAxiosPrivate', () => jest.fn())
jest.mock('@/components/Axios/Axios', () => ({
  post: jest.fn(),
}))

describe('createExpenseRequest', () => {
  test('successfully deletes an expense', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Context.Provider value={mockState}>
          <Expenses />
        </Context.Provider>
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByTestId('add-expense'))

    const amountField = screen.getByTestId('amount-expense').firstChild.firstChild
    const endAdornment = screen.getByTestId('tags-expense').children[1].children[1].children[0]

    fireEvent.change(amountField, { target: { value: '23.00' } })
    fireEvent.click(endAdornment)

    const firstOption = screen.getAllByRole('presentation')[2].firstChild.firstChild.firstChild

    fireEvent.click(firstOption)

    fireEvent.click(screen.getByTestId('submit-expense'))

    await waitFor(() => {
      expect(mockState.createExpenseRequest).toHaveBeenCalled()
    })
  })
})
