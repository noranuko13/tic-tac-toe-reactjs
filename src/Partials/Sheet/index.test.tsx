import React from 'react'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Sheet } from './index'
import { RecordList } from '../../Models/RecordList'
import { Record } from '../../Models/Record'
import userEvent from '@testing-library/user-event'

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
  expect(e).toHaveTextContent('Text')
  expect(e).toHaveTextContent('(x, y)')
  expect(e).toHaveTextContent('Go to game start')
})

test('Sheet: click sort button', async () => {
  const mockFn = jest.fn()
  render(
    <Sheet
      recordList={new RecordList([new Record()])}
      stepNumber={0}
      jumpTo={() => {}}
      sortRecords={() => mockFn()}
      orderType={'asc'}
    />
  )
  const user = userEvent.setup()

  const sortButton = screen.getByTestId('sheet-sort-button')
  await user.click(sortButton)
  expect(mockFn).toHaveBeenCalled()
})

test('Sheet: click move button', async () => {
  const mockFn = jest.fn()
  render(
    <Sheet
      recordList={new RecordList([new Record()])}
      stepNumber={0}
      jumpTo={() => mockFn()}
      sortRecords={() => {}}
      orderType={'asc'}
    />
  )
  const user = userEvent.setup()

  const moveButton = screen.getByTestId('sheet-move-button')
  await user.click(moveButton)
  expect(mockFn).toHaveBeenCalled()
})
