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

test('Board: click twice to show O', () => {
  render(<Board />)

  const squares = screen.getAllByTestId('square')
  squares[8].click() // X
  const index = Math.floor(Math.random() * 8)
  squares[index].click() // O

  for (let i = 0; i <= 7; i++) {
    if (i === index) {
      expect(squares[i]).toHaveTextContent('O')
      continue
    }
    expect(squares[i]).toHaveTextContent('')
  }
})

test('Board: click on the same square twice does nothing', () => {
  render(<Board />)

  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  expect(squares[0]).toHaveTextContent('X')

  squares[0].click() // O
  expect(squares[0]).toHaveTextContent('X')
  squares[1].click() // O
  expect(squares[1]).toHaveTextContent('O')
})

test('Board: the winner is decided, nothing will be done', () => {
  render(<Board />)

  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[1].click() // O
  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X (Winner: X)
  squares[7].click() // O
  expect(squares[7]).toHaveTextContent('')
})

test('Board: status will change.', () => {
  render(<Board />)

  const status = screen.getByTestId('status')
  const squares = screen.getAllByTestId('square')
  expect(status).toHaveTextContent('Next player: X')

  squares[0].click() // X
  expect(status).toHaveTextContent('Next player: O')

  squares[1].click() // O
  expect(status).toHaveTextContent('Next player: X')

  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X
  expect(status).toHaveTextContent('Winner: X')

  squares[7].click() // O
  expect(status).toHaveTextContent('Winner: X')
})
