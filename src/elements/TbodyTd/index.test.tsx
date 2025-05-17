import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { TbodyTd } from './index'

test('TbodyTd: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <TbodyTd data-testid={'tbody-td'}>#</TbodyTd>
    </I18nextProvider>,
  )

  const td = screen.getByTestId('tbody-td')
  expect(td).toBeInTheDocument()
  expect(td).toHaveTextContent('#')
})
