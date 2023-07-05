import React from 'react'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Sheet } from './index'
import { RecordList } from '../../Models/RecordList'
import { Record } from '../../Models/Record'

test('Sheet: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Sheet
        recordList={new RecordList([new Record()])}
        stepNumber={0}
        jumpTo={() => {}}
        sortRecords={() => {}}
        orderType={'asc'}
      />
    </I18nextProvider>
  )

  const e = screen.getByTestId('sheet')
  expect(e).toBeInTheDocument()
})
