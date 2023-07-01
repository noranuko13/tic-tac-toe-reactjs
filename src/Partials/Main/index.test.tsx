import React from 'react'
import { render, screen } from '@testing-library/react'
import { Main } from './index'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'

test('Main: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Main board={<></>} move={<></>} />
    </I18nextProvider>
  )

  const e = screen.getByTestId('main')
  expect(e).toBeInTheDocument()
})
