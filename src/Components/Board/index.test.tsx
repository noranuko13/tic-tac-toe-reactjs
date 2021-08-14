import React from 'react'
import { render, screen } from '@testing-library/react'
import { Board } from './index'

test('Board: render', () => {
  render(<Board />)

  const e = screen.getByTestId('board')
  expect(e).toBeInTheDocument()
})

test('Board: click to show X', () => {
  render(<Board />)

  const squares = screen.getAllByTestId('square')
  const index = Math.floor(Math.random() * 9)
  squares[index].click()

  for (let i = 0; i <= 8; i++) {
    if (i === index) {
      expect(squares[i]).toHaveTextContent('X')
      continue
    }
    expect(squares[i]).toHaveTextContent('')
  }
})
