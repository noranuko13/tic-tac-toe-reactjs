import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Wrapper } from './index'

test('Wrapper: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Wrapper>#</Wrapper>
    </I18nextProvider>
  )

  const e = screen.getByTestId('wrapper')
  expect(e).toBeInTheDocument()
})
