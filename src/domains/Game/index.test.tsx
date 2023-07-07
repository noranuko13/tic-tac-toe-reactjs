import React from 'react'
import { render, screen } from '@testing-library/react'
import { Game } from './index'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getLines = (): HTMLElement[] => {
  return screen.getAllByTestId('line')
}

const getMoveButtons = (): HTMLElement[] => {
  return screen.getAllByTestId('sheet-move-button')
}

const simulateDrawGame = async (user: UserEvent): Promise<HTMLElement[]> => {
  const squares = screen.getAllByTestId('square')
  await user.click(squares[0]) // X
  await user.click(squares[3]) // O
  await user.click(squares[1]) // X
  await user.click(squares[4]) // O
  await user.click(squares[5]) // X
  await user.click(squares[2]) // O
  await user.click(squares[8]) // X
  await user.click(squares[7]) // O
  await user.click(squares[6]) // X
  return squares
}

const simulateWinX = async (user: UserEvent): Promise<HTMLElement[]> => {
  const squares = screen.getAllByTestId('square')
  await user.click(squares[0]) // X
  await user.click(squares[1]) // O
  await user.click(squares[3]) // X
  await user.click(squares[4]) // O
  await user.click(squares[6]) // X (Winner: X)
  return squares
}

test('Game: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Game />
    </I18nextProvider>
  )

  const e = screen.getByTestId('game')
  expect(e).toBeInTheDocument()
})

test('Game: click to show X', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = screen.getAllByTestId('square')
  const index = Math.floor(Math.random() * 9)
  await user.click(squares[index])

  for (let i = 0; i <= 8; i++) {
    if (i === index) {
      expect(squares[i]).toHaveTextContent('X')
      continue
    }
    expect(squares[i]).toHaveTextContent('')
  }
})

test('Game: click twice to show O', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = screen.getAllByTestId('square')
  await user.click(squares[8]) // X
  const index = Math.floor(Math.random() * 8)
  await user.click(squares[index]) // O

  for (let i = 0; i <= 7; i++) {
    if (i === index) {
      expect(squares[i]).toHaveTextContent('O')
      continue
    }
    expect(squares[i]).toHaveTextContent('')
  }
})

test('Game: click on the same square twice does nothing', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = screen.getAllByTestId('square')
  await user.click(squares[0]) // X
  expect(squares[0]).toHaveTextContent('X')

  await user.click(squares[0]) // O
  expect(squares[0]).toHaveTextContent('X')
  await user.click(squares[1]) // O
  expect(squares[1]).toHaveTextContent('O')
})

test('Game: the winner is decided, nothing will be done', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = await simulateWinX(user)

  await user.click(squares[7]) // O
  expect(squares[7]).toHaveTextContent('')
})

test('Game: status will change.', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const status = screen.getByTestId('status')
  const squares = screen.getAllByTestId('square')
  expect(status).toHaveTextContent('Next player: X')

  await user.click(squares[0]) // X
  expect(status).toHaveTextContent('Next player: O')

  await user.click(squares[1]) // O
  expect(status).toHaveTextContent('Next player: X')

  await user.click(squares[3]) // X
  await user.click(squares[4]) // O
  await user.click(squares[6]) // X
  expect(status).toHaveTextContent('Winner: X')

  await user.click(squares[7]) // O
  expect(status).toHaveTextContent('Winner: X')
})

test('Game: texts will change.', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const getTexts = () => {
    return screen.getAllByTestId('text')
  }
  const squares = screen.getAllByTestId('square')
  expect(getTexts()[0]).toHaveTextContent('Go to game start')

  await user.click(squares[0]) // X
  expect(getTexts()[1]).toHaveTextContent('Go to move #1')

  await user.click(squares[1]) // O
  expect(getTexts()[2]).toHaveTextContent('Go to move #2')

  await user.click(squares[3]) // X
  await user.click(squares[4]) // O
  await user.click(squares[6]) // X
  expect(getTexts()[5]).toHaveTextContent('Go to move #5')

  await user.click(squares[7]) // O
  expect(getTexts()[6]).toBeUndefined()
})

test('Game: moves will change.', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = screen.getAllByTestId('square')
  expect(getMoveButtons()[0]).toHaveTextContent('#0')

  await user.click(squares[0]) // X
  expect(getMoveButtons()[1]).toHaveTextContent('#1')

  await user.click(squares[1]) // O
  expect(getMoveButtons()[2]).toHaveTextContent('#2')

  await user.click(squares[3]) // X
  await user.click(squares[4]) // O
  await user.click(squares[6]) // X
  expect(getMoveButtons()[5]).toHaveTextContent('#5')

  await user.click(squares[7]) // O
  expect(getMoveButtons()[6]).toBeUndefined()
})

test('Game: show past moves', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = await simulateWinX(user)
  await user.click(getMoveButtons()[2])

  expect(squares[0]).toHaveTextContent('X')
  expect(squares[1]).toHaveTextContent('O')
  expect(squares[3]).toHaveTextContent('')
  expect(squares[4]).toHaveTextContent('')
  expect(squares[6]).toHaveTextContent('')

  await user.click(squares[2]) // X

  expect(getMoveButtons()[3]).toHaveTextContent('#3')
  expect(getMoveButtons()[4]).toBeUndefined()
})

test('Game: display xy coordinates', async () => {
  render(<Game />)
  const user = userEvent.setup()

  await simulateDrawGame(user)

  const xys = screen.getAllByTestId('xy')
  expect(xys[0]).toHaveTextContent('')
  expect(xys[1]).toHaveTextContent('(1, 1)') // #1
  expect(xys[2]).toHaveTextContent('(1, 2)') // #2
  expect(xys[3]).toHaveTextContent('(2, 1)') // #3
  expect(xys[4]).toHaveTextContent('(2, 2)') // #4
  expect(xys[5]).toHaveTextContent('(3, 2)') // #5
  expect(xys[6]).toHaveTextContent('(3, 1)') // #6
  expect(xys[7]).toHaveTextContent('(3, 3)') // #7
  expect(xys[8]).toHaveTextContent('(2, 3)') // #8
  expect(xys[9]).toHaveTextContent('(1, 3)') // #9
})

test('Game: highlight the current line', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = screen.getAllByTestId('square')

  const turn0 = getLines()
  expect(turn0[0]).toHaveClass('active')

  await user.click(squares[0])

  const turn1 = getLines()
  expect(turn1[0].classList.contains('active')).toBe(false)
  expect(turn1[1]).toHaveClass('active')

  await user.click(squares[1])

  const turn2 = getLines()
  expect(turn2[0].classList.contains('active')).toBe(false)
  expect(turn2[1].classList.contains('active')).toBe(false)
  expect(turn2[2]).toHaveClass('active')
})

test('Game: toggle button', async () => {
  render(<Game />)
  const user = userEvent.setup()

  const squares = screen.getAllByTestId('square')
  await user.click(squares[0]) // X
  await user.click(squares[3]) // O

  const asc = getMoveButtons()
  expect(asc[0]).toHaveTextContent('#0')
  expect(asc[1]).toHaveTextContent('#1')
  expect(asc[2]).toHaveTextContent('#2')

  await user.click(screen.getByTestId('sheet-sort-button'))

  const desc = getMoveButtons()
  expect(desc[0]).toHaveTextContent('#2')
  expect(desc[1]).toHaveTextContent('#1')
  expect(desc[2]).toHaveTextContent('#0')
})

test('Game: show draw message', async () => {
  render(<Game />)
  const user = userEvent.setup()

  await simulateDrawGame(user)

  const status = screen.getByTestId('status')
  expect(status).toHaveTextContent("It's a tie!")
})
