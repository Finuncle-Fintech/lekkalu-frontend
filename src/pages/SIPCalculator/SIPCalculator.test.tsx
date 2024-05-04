import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import SIPCalculator from './SIPCalculator'
import { renderWithClient } from '@/__test__/utils'

// Mock ApexCharts
jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }))

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.ResizeObserver
window.ResizeObserver = ResizeObserverMock

const Component = () => (
  <BrowserRouter>
    <TooltipProvider>
      <SIPCalculator />
    </TooltipProvider>
  </BrowserRouter>
)

// Mock handleCopy function
// const mockHandleCopy = jest.fn()

describe('SIPCalculator', () => {
  test('has 1 child', () => {
    // Render the component
    const { container } = render(<Component />)

    // Access the container's children
    const children = container.children

    // Assert that there is exactly one child
    expect(children.length).toBe(1)
  })

  test('buttons are defined', () => {
    renderWithClient(<Component />)
    // Find buttons
    const shareButton = screen.getByText('Share')
    const exportToExcelButton = screen.getByText('Export to Excel')

    // Assert buttons are in the document
    expect(shareButton).toBeInTheDocument()
    expect(exportToExcelButton).toBeInTheDocument()
  })

  test('inputs are correctly defined', () => {
    // Render the component
    render(<Component />)

    // Find each input field by its label text
    const monthlyAmountInput = screen.getByText(/Monthly investment amount (₹)/i)
    const durationInvestmentInput = screen.getByText('Duration of the investment (Yr)')
    const rateReturnInput = screen.getByText('Expected annual return (%)')

    // Assert on the existence of each input field
    expect(monthlyAmountInput).toBeInTheDocument()
    expect(durationInvestmentInput).toBeInTheDocument()
    expect(rateReturnInput).toBeInTheDocument()
  })
})
