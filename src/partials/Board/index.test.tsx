import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { SquareList } from '../../models'
import { Board } from './index'

const getBoard = (): HTMLElement => {
  return screen.getByTestId('board')
}

test('Board: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Board squareList={new SquareList()} moveForward={() => {}} />
    </I18nextProvider>
  )

  const board = getBoard()
  expect(board).toBeInTheDocument()
})
