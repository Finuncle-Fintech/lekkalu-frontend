import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import CAGRCalculator from './CAGRCalculator'

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
      <CAGRCalculator />
    </TooltipProvider>
  </BrowserRouter>
)

describe('CAGRCalculator', () => {
  window.ResizeObserver = ResizeObserver

  test('has 1 child', () => {
    // Render the component
    const { container } = render(<Component />)

    // Access the container's children
    const children = container.children

    // Assert that there is exactly one child
    expect(children.length).toBe(1)
  })

  test('buttons are defined', () => {
    render(<Component />)

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

    const initialValueInput = screen.getByText(/Initial value \(₹\)/i)
    expect(initialValueInput).toBeInTheDocument()

    const finalValueInput = screen.getByText(/Final Value Costs/i)
    expect(finalValueInput).toBeInTheDocument()

    const durationInput = screen.getByText(/Duration of Investment/i)
    expect(durationInput).toBeInTheDocument()
  })
})
