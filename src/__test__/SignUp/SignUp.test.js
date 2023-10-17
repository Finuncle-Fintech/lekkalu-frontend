import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/utils/client'
import Signup from '@/pages/Signup/Signup'

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
}))

jest.mock('../../components/Axios/Axios', () => ({
  post: jest.fn(),
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}))

jest.mock('@mui/material/Typography', () => {
  return {
    __esModule: true,
    default: () => <></>, // Mock return fragment empty
  }
})

jest.mock('@mui/material/Link', () => {
  return {
    __esModule: true,
    default: () => <></>,
  }
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Sign Up functionality', () => {
  test('Show error when clicking continue without entering values', async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Signup />
        </QueryClientProvider>
      </BrowserRouter>,
    )

    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)

    const usernameRequired = await screen.findByText('Enter at least 6 characters!')
    const passwordRequired = await screen.findByText('Enter at least 8 characters!')
    const emailRequired = await screen.findByText('Invalid Email!')

    expect(usernameRequired).toBeInTheDocument()
    expect(passwordRequired).toBeInTheDocument()
    expect(emailRequired).toBeInTheDocument()
  })

  /** @TODO Write proper test cases */
  // test('Show error when username exists in database', async () => {
  //   render(
  //     <BrowserRouter>
  //       <QueryClientProvider client={queryClient}>
  //         <Signup />
  //       </QueryClientProvider>
  //     </BrowserRouter>,
  //   )

  //   const username = screen.getByLabelText('Username')
  //   const email = screen.getByLabelText('Email Address')
  //   const password = screen.getByLabelText('Password')
  //   const conditions = screen.getByTestId('conditions')
  //   const policies = screen.getByTestId('policies')
  //   fireEvent.change(username, {
  //     target: { value: 'some_user' },
  //   })
  //   fireEvent.change(password, {
  //     target: { value: 'password' },
  //   })
  //   fireEvent.change(email, {
  //     target: { value: 'testing@test.com' },
  //   })
  //   fireEvent.click(conditions)
  //   fireEvent.click(policies)

  //   const errorMessage = 'username: This field must be unique.'
  //   const errorResponse = {
  //     response: {
  //       status: 400,
  //       data: [errorMessage],
  //     },
  //   }

  //   jest.spyOn(axiosClient, 'post').mockRejectedValue(errorResponse)
  //   fireEvent.click(screen.getByText('Continue'))

  //   await waitFor(() => {
  //     const errorElement = screen.getByText(`0: ${errorMessage}`)
  //     expect(errorElement).toBeInTheDocument()
  //   })
  // })
})
