import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from './index'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'

test('Header: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Header />
    </I18nextProvider>
  )

  const e = screen.getByTestId('header')
  expect(e).toBeInTheDocument()
  expect(e).toHaveTextContent('Tic Tac Toe')
})
