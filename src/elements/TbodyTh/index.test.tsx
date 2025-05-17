import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { TbodyTh } from './index'

test('TbodyTh: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <TbodyTh>#</TbodyTh>
    </I18nextProvider>,
  )

  const button = screen.getByTestId('tbody-th')
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent('#')
})
