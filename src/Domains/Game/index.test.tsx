import React from 'react'
import { render, screen } from '@testing-library/react'
import { Game } from './index'

const getLines = (): HTMLElement[] => {
  return screen.getAllByTestId('line')
}

const getMoveButtons = (): HTMLElement[] => {
  return screen.getAllByTestId('move-button')
}

const simulateDrawGame = (): HTMLElement[] => {
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
  return squares
}

const simulateWinX = (): HTMLElement[] => {
  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[1].click() // O
  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X (Winner: X)
  return squares
}

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

  const squares = simulateWinX()

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

test('Game: texts will change.', () => {
  render(<Game />)

  const getTexts = () => { return screen.getAllByTestId('text') }
  const squares = screen.getAllByTestId('square')
  expect(getTexts()[0]).toHaveTextContent('Go to game start')

  squares[0].click() // X
  expect(getTexts()[1]).toHaveTextContent('Go to move #1')

  squares[1].click() // O
  expect(getTexts()[2]).toHaveTextContent('Go to move #2')

  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X
  expect(getTexts()[5]).toHaveTextContent('Go to move #5')

  squares[7].click() // O
  expect(getTexts()[6]).toBeUndefined()
})

test('Game: moves will change.', () => {
  render(<Game />)

  const squares = screen.getAllByTestId('square')
  expect(getMoveButtons()[0]).toHaveTextContent('#0')

  squares[0].click() // X
  expect(getMoveButtons()[1]).toHaveTextContent('#1')

  squares[1].click() // O
  expect(getMoveButtons()[2]).toHaveTextContent('#2')

  squares[3].click() // X
  squares[4].click() // O
  squares[6].click() // X
  expect(getMoveButtons()[5]).toHaveTextContent('#5')

  squares[7].click() // O
  expect(getMoveButtons()[6]).toBeUndefined()
})

test('Game: show past moves', () => {
  render(<Game />)

  const squares = simulateWinX()
  getMoveButtons()[2].click()

  expect(squares[0]).toHaveTextContent('X')
  expect(squares[1]).toHaveTextContent('O')
  expect(squares[3]).toHaveTextContent('')
  expect(squares[4]).toHaveTextContent('')
  expect(squares[6]).toHaveTextContent('')

  squares[2].click() // X

  expect(getMoveButtons()[3]).toHaveTextContent('#3')
  expect(getMoveButtons()[4]).toBeUndefined()
})

test('Game: display xy coordinates', () => {
  render(<Game />)

  simulateDrawGame()

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

  const turn0 = getLines()
  expect(turn0[0]).toHaveClass('active')

  squares[0].click()

  const turn1 = getLines()
  expect(turn1[0].classList.contains('active')).toBe(false)
  expect(turn1[1]).toHaveClass('active')

  squares[1].click()

  const turn2 = getLines()
  expect(turn2[0].classList.contains('active')).toBe(false)
  expect(turn2[1].classList.contains('active')).toBe(false)
  expect(turn2[2]).toHaveClass('active')
})

test('Game: toggle button', () => {
  render(<Game />)

  const squares = screen.getAllByTestId('square')
  squares[0].click() // X
  squares[3].click() // O

  const asc = getMoveButtons()
  expect(asc[0]).toHaveTextContent('#0')
  expect(asc[1]).toHaveTextContent('#1')
  expect(asc[2]).toHaveTextContent('#2')

  screen.getByTestId('move-sort-button').click()

  const desc = getMoveButtons()
  expect(desc[0]).toHaveTextContent('#2')
  expect(desc[1]).toHaveTextContent('#1')
  expect(desc[2]).toHaveTextContent('#0')
})

test('Game: show draw message', () => {
  render(<Game />)

  simulateDrawGame()

  const status = screen.getByTestId('status')
  expect(status).toHaveTextContent('It\'s a tie!')
})
