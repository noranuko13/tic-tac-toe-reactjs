import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Footer } from './index'

test('Footer: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Footer />
    </I18nextProvider>
  )

  const e = screen.getByTestId('footer')
  expect(e).toBeInTheDocument()
})
