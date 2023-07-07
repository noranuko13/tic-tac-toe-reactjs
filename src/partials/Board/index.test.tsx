import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { SquareList } from '../../models'
import { Board } from './index'

test('Board: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Board squareList={new SquareList()} onClick={() => {}} />
    </I18nextProvider>
  )

  const e = screen.getByTestId('board')
  expect(e).toBeInTheDocument()
})
