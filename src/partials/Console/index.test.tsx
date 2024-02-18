import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Console } from './index'

const getConsole = (): HTMLElement => {
  return screen.getByTestId('console')
}

const getNewGameButton = (): HTMLElement => {
  return screen.getByTestId('new-game-button')
}

test('Console: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Console newGame={() => {}} />
    </I18nextProvider>,
  )

  const console = getConsole()
  expect(console).toBeInTheDocument()
  expect(console).toHaveTextContent('New Game')
})

test('Console: click', async () => {
  const mockFn = jest.fn()
  render(<Console newGame={() => mockFn()} />)
  const user = userEvent.setup()

  const button = getNewGameButton()
  await user.click(button)
  expect(mockFn).toHaveBeenCalled()
})
