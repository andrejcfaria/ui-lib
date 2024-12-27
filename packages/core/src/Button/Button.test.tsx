import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  test('renders with correct text', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  test('button clicked', () => {
    const fn = jest.fn()
    render(<Button onClick={fn}>"Click"</Button>)
    const button = screen.getByRole('button')
    button.click()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('button hovered', async () => {
    render(<Button>Click</Button>)
    const button = screen.getByRole('button')
    await userEvent.hover(button)
    expect(button).toHaveAttribute('data-hover')
  })

  test('default button type is button', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
