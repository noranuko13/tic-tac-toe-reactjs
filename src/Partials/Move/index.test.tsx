import React from 'react'
import { render, screen } from '@testing-library/react'
import { Move } from './index'

test('Move: render', () => {
  render(<Move history={[{
    squares: Array(9).fill(''),
    xy: []
  }]} stepNumber={0} jumpTo={() => {}} />)

  const e = screen.getByTestId('move')
  expect(e).toBeInTheDocument()
})
