import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Record, RecordList } from '../../models'
import { Move } from './index'

test('Move: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Move
        recordList={new RecordList([new Record()])}
        stepNumber={0}
        jumpTo={() => {}}
      />
    </I18nextProvider>
  )

  const move = screen.getByTestId('move')
  expect(move).toBeInTheDocument()
})
