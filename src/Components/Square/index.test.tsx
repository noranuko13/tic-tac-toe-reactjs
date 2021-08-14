import React from 'react'
import { render, screen } from '@testing-library/react'
import { Square } from './index'

test('Square: render', () => {
  render(<Square value={3} />)

  const e = screen.getByTestId('square')
  expect(e).toBeInTheDocument()
  expect(e.textContent).toBe('')
})

test('Square: onClick', () => {
  render(<Square value={4} />)

  const e = screen.getByTestId('square')
  e.click()
  expect(e.textContent).toBe('X')
})
