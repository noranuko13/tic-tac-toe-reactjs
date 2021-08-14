import React from 'react'
import { render, screen } from '@testing-library/react'
import { Game } from './index'

test('Game: render', () => {
  render(<Game />)

  const e = screen.getByTestId('game')
  expect(e).toBeInTheDocument()
})

test('Game: click to show X', () => {
  render(<Game />)

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

test('Game: click twice to show O', () => {
  render(<Game />)

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

test('Game: click on the same square twice does nothing', () => {
  render(<Game />)

  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  expect(squares[0]).toHaveTextContent('X')

  squares[0].click() // O
  expect(squares[0]).toHaveTextContent('X')
  squares[1].click() // O
  expect(squares[1]).toHaveTextContent('O')
})

test('Game: the winner is decided, nothing will be done', () => {
  render(<Game />)

  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[1].click() // O
  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X (Winner: X)
  squares[7].click() // O
  expect(squares[7]).toHaveTextContent('')
})

test('Game: status will change.', () => {
  render(<Game />)

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

test('Game: moves will change.', () => {
  render(<Game />)

  const getMoves = () => { return screen.getAllByTestId('move') }
  const squares = screen.getAllByTestId('square')
  expect(getMoves()[0]).toHaveTextContent('Go to game start')

  squares[0].click() // X
  expect(getMoves()[1]).toHaveTextContent('Go to move #1')

  squares[1].click() // O
  expect(getMoves()[2]).toHaveTextContent('Go to move #2')

  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X
  expect(getMoves()[5]).toHaveTextContent('Go to move #5')

  squares[7].click() // O
  expect(getMoves()[6]).toBeUndefined()
})
