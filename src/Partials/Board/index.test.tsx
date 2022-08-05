import React from 'react'
import { render, screen } from '@testing-library/react'
import { Board } from './index'
import { Squares } from '../../Models/Squares'

test('Board: render', () => {
  render(<Board squares={new Squares()} onClick={() => {}} />)

  const e = screen.getByTestId('board')
  expect(e).toBeInTheDocument()
})
