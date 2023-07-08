import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Footer } from './index'

const getFooter = (): HTMLElement => {
  return screen.getByTestId('footer')
}

test('Footer: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Footer />
    </I18nextProvider>
  )

  const footer = getFooter()
  expect(footer).toBeInTheDocument()
  expect(footer).toHaveTextContent('noranuko13/tic-tac-toe-reactjs | GitHub')
})
