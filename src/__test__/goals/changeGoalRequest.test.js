import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockState } from '@/__test__/data/Goals'
import Goals from '@/components/Goals/Goals'
import { Context } from '@/provider/Provider'

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
}))

describe('changeGoalRequest', () => {
  test('successfully changes a goal', async () => {
    render(
      <Context.Provider value={mockState}>
        <Goals />
      </Context.Provider>,
    )

    fireEvent.click(screen.getAllByPlaceholderText('edit-goal')[0])
    fireEvent.click(screen.getByTestId('submit-goal'))

    await waitFor(() => {
      expect(mockState.changeGoalRequest).toHaveBeenCalled()
    })
  })
})
