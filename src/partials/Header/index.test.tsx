import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Header } from './index'

const getHeader = (): HTMLElement => {
  return screen.getByTestId('header')
}

test('Header: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Header />
    </I18nextProvider>,
  )

  const header = getHeader()
  expect(header).toBeInTheDocument()
  expect(header).toHaveTextContent('Tic Tac Toe')
})
