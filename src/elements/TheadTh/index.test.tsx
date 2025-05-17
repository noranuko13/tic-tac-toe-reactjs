import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { TheadTh } from './index'

test('TheadTh: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <TheadTh>#</TheadTh>
    </I18nextProvider>,
  )

  const button = screen.getByTestId('thead-th')
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent('#')
})
