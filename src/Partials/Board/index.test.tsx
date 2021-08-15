import React from 'react'
import { render, screen } from '@testing-library/react'
import { Board } from './index'

test('Board: render', () => {
  render(<Board squares={Array(9).fill('')} onClick={() => {}} />)

  const e = screen.getByTestId('board')
  expect(e).toBeInTheDocument()
})
