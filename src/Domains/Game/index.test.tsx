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

test('Game: descs will change.', () => {
  render(<Game />)

  const getDescs = () => { return screen.getAllByTestId('desc') }
  const squares = screen.getAllByTestId('square')
  expect(getDescs()[0]).toHaveTextContent('Go to game start')

  squares[0].click() // X
  expect(getDescs()[1]).toHaveTextContent('Go to move #1')

  squares[1].click() // O
  expect(getDescs()[2]).toHaveTextContent('Go to move #2')

  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X
  expect(getDescs()[5]).toHaveTextContent('Go to move #5')

  squares[7].click() // O
  expect(getDescs()[6]).toBeUndefined()
})

test('Game: moves will change.', () => {
  render(<Game />)

  const getMoves = () => { return screen.getAllByTestId('move-button') }
  const squares = screen.getAllByTestId('square')
  expect(getMoves()[0]).toHaveTextContent('#0')

  squares[0].click() // X
  expect(getMoves()[1]).toHaveTextContent('#1')

  squares[1].click() // O
  expect(getMoves()[2]).toHaveTextContent('#2')

  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X
  expect(getMoves()[5]).toHaveTextContent('#5')

  squares[7].click() // O
  expect(getMoves()[6]).toBeUndefined()
})

test('Game: show past moves', () => {
  render(<Game />)

  const getMoves = () => { return screen.getAllByTestId('move-button') }
  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[1].click() // O
  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X

  getMoves()[2].click()
  expect(squares[0]).toHaveTextContent('X')
  expect(squares[1]).toHaveTextContent('O')
  expect(squares[3]).toHaveTextContent('')
  expect(squares[4]).toHaveTextContent('')
  expect(squares[6]).toHaveTextContent('')

  squares[2].click() // X
  expect(getMoves()[3]).toHaveTextContent('#3')
  expect(getMoves()[4]).toBeUndefined()
})

test('Game: display xy coordinates', () => {
  render(<Game />)

  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[3].click() // O
  squares[1].click() // X
  squares[4].click() // O
  squares[5].click() // X
  squares[2].click() // O
  squares[8].click() // X
  squares[7].click() // O
  squares[6].click() // X

  const xys = screen.getAllByTestId('xy')
  expect(xys[0]).toHaveTextContent('')
  expect(xys[1]).toHaveTextContent('(1, 1)') // #1
  expect(xys[2]).toHaveTextContent('(2, 1)') // #2
  expect(xys[3]).toHaveTextContent('(1, 2)') // #3
  expect(xys[4]).toHaveTextContent('(2, 2)') // #4
  expect(xys[5]).toHaveTextContent('(2, 3)') // #5
  expect(xys[6]).toHaveTextContent('(1, 3)') // #6
  expect(xys[7]).toHaveTextContent('(3, 3)') // #7
  expect(xys[8]).toHaveTextContent('(3, 2)') // #8
  expect(xys[9]).toHaveTextContent('(3, 1)') // #9
})

test('Game: highlight the current line', () => {
  render(<Game />)

  const squares = screen.getAllByTestId('square')
  const getLines = () => { return screen.getAllByTestId('line') }
  expect(getLines()[0]).toHaveClass('active')

  squares[0].click()
  expect(getLines()[0].classList.contains('active')).toBe(false)
  expect(getLines()[1]).toHaveClass('active')

  squares[1].click()
  expect(getLines()[0].classList.contains('active')).toBe(false)
  expect(getLines()[1].classList.contains('active')).toBe(false)
  expect(getLines()[2]).toHaveClass('active')
})

test('Game: toggle button', () => {
  render(<Game />)

  const getMoves = () => { return screen.getAllByTestId('move-button') }
  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[3].click() // O
  expect(getMoves()[0]).toHaveTextContent('#0')
  expect(getMoves()[1]).toHaveTextContent('#1')
  expect(getMoves()[2]).toHaveTextContent('#2')

  const sort = screen.getByTestId('move-sort-button')
  sort.click()
  expect(getMoves()[0]).toHaveTextContent('#2')
  expect(getMoves()[1]).toHaveTextContent('#1')
  expect(getMoves()[2]).toHaveTextContent('#0')
})
