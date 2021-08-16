import React from 'react'
import { render, screen } from '@testing-library/react'
import { Square } from './index'

test('Square: render', () => {
  render(<Square value={''} onClick={() => {}} active={false} />)

  const e = screen.getByTestId('square')
  expect(e).toBeInTheDocument()
  expect(e.textContent).toBe('')
})

test('Square: render X', () => {
  render(<Square value={'X'} onClick={() => {}} active={false} />)

  const e = screen.getByTestId('square')
  expect(e).toBeInTheDocument()
  expect(e.textContent).toBe('X')
})
