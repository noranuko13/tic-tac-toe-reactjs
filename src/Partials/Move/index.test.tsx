import React from 'react'
import { render, screen } from '@testing-library/react'
import { Move } from './index'
import { Squares } from '../../Models/Squares'

test('Move: render', () => {
  render(<Move history={[{
    squares: new Squares(),
    xy: []
  }]} stepNumber={0} jumpTo={() => {}} />)

  const e = screen.getByTestId('move')
  expect(e).toBeInTheDocument()
})
