import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import EmiCalculator from './EmiCalculator'
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
      <EmiCalculator />
    </TooltipProvider>
  </BrowserRouter>
)

describe('EmiCalculator', () => {
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
    renderWithClient(<Component />)

    // Query for input elements by their labels
    const loanPrincipalInput = screen.getByText('Loan Principal')
    const loanInterestInput = screen.getByText('Loan Interest')
    const loanTenureInput = screen.getByText('Loan Tenure')
    const disbursementDateInput = screen.getByText('Disbursement Date')
    const emiDayInput = screen.getByText('Emi Day')

    // Assert that each input element is defined
    expect(loanPrincipalInput).toBeDefined()
    expect(loanInterestInput).toBeDefined()
    expect(loanTenureInput).toBeDefined()
    expect(disbursementDateInput).toBeDefined()
    expect(emiDayInput).toBeDefined()
  })
})
