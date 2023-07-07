import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Main } from './index'

test('Main: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Main board={<></>} move={<></>} />
    </I18nextProvider>
  )

  const e = screen.getByTestId('main')
  expect(e).toBeInTheDocument()
})
