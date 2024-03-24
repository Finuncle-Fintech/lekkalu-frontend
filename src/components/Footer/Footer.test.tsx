import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

describe('CalculatorLink', () => {
  test('navigates to the correct route when clicked cagr-calculator', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Link to='/cagr-calculator' className='hover:underline'>
          CAGR Calculator
        </Link>
      </BrowserRouter>,
    )

    // Find the link text
    const link = getByText('CAGR Calculator')

    // Click the link
    fireEvent.click(link)

    // Check if the browser navigated to the correct route
    expect(window.location.pathname).toBe('/cagr-calculator')
  })

  test('navigates to the correct route when clicked sip-calculator', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Link to='/sip-calculator' className='hover:underline'>
          SIP Calculator
        </Link>
      </BrowserRouter>,
    )

    // Find the link text
    const link = getByText('SIP Calculator')

    // Click the link
    fireEvent.click(link)

    // Check if the browser navigated to the correct route
    expect(window.location.pathname).toBe('/sip-calculator')
  })

  test('navigates to the correct route when clicked emi-calculator', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Link to='/emi-calculator' className='hover:underline'>
          EMI Calculator
        </Link>
      </BrowserRouter>,
    )

    // Find the link text
    const link = getByText('EMI Calculator')

    // Click the link
    fireEvent.click(link)

    // Check if the browser navigated to the correct route
    expect(window.location.pathname).toBe('/emi-calculator')
  })
})
