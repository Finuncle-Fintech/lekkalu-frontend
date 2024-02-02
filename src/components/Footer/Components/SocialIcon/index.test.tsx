import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { icons } from 'lucide-react'
import SocialIcon from './index'

const LinkedInIcon = icons.Linkedin
const link = 'https://www.linkedin.com'
const linkedInClassName = 'lucide lucide-linkedin'

const Component = () => (
  <BrowserRouter>
    <SocialIcon Icon={LinkedInIcon} link={link} />
  </BrowserRouter>
)

test('Icon should render', () => {
  const { container } = render(<Component />)
  const icon = container.querySelector('svg')
  expect(icon).toBeInTheDocument()
  if (icon) {
    expect(icon).toHaveClass(linkedInClassName)
  } else {
    fail('Icon is not rendered')
  }
})

test('Icon must be clickable', () => {
  const result = render(<Component />)

  const anchorTag = result.container.querySelector('a')
  expect(anchorTag).toBeInTheDocument()
  expect(anchorTag).toHaveAttribute('href', link)
  expect(anchorTag).toHaveAttribute('target', '_blank')
  if (anchorTag) {
    fireEvent.click(anchorTag)
  }
})
