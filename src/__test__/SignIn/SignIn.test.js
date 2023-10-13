import React from 'react'
import Signin from 'pages/Signin/Signin'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import swal from 'sweetalert2'
import { Context } from 'provider/Provider'

const mockState = {
  fetchToken: jest.fn(),
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
}))

describe('SignIn test functionality', () => {
  test('Show error when clicking continue without entering values', async () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockState}>
          <Signin />
        </Context.Provider>
      </BrowserRouter>,
    )

    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)

    const usernameRequired = await screen.findByText('Username is required!')
    const passwordRequired = await screen.findByText('Password is required!')

    expect(usernameRequired).toBeInTheDocument()
    expect(passwordRequired).toBeInTheDocument()
  })

  test('Show error when username is not entered', async () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockState}>
          <Signin />
        </Context.Provider>
      </BrowserRouter>,
    )

    const usernameInput = screen.getByLabelText('Password')
    fireEvent.change(usernameInput, {
      target: { value: 'some_random_password' },
    })
    fireEvent.click(screen.getByText('Continue'))

    const usernameRequired = await screen.findByText('Username is required!')
    expect(usernameRequired).toBeInTheDocument()
  })

  test('Show error when password is not entered', async () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockState}>
          <Signin />
        </Context.Provider>
      </BrowserRouter>,
    )

    const usernameInput = screen.getByLabelText('Username')
    fireEvent.change(usernameInput, {
      target: { value: 'some_user' },
    })
    fireEvent.click(screen.getByText('Continue'))

    const passwordRequired = await screen.findByText('Password is required!')
    expect(passwordRequired).toBeInTheDocument()
  })

  test('Show error when user does not exists', async () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockState}>
          <Signin />
        </Context.Provider>
      </BrowserRouter>,
    )

    const errorText = 'User with provided details does not exist'
    const spySwal = jest.spyOn(swal, 'fire')

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    fireEvent.change(usernameInput, {
      target: { value: 'username, which does not exists' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'badPassword' },
    })

    fireEvent.click(screen.getByText('Continue'))

    await waitFor(() => {
      expect(spySwal).toBeCalledTimes(1)
    })

    await waitFor(() => {
      expect(swal.getHtmlContainer().textContent).toEqual(errorText)
    })
  })
})
