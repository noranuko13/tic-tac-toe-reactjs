import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Record, RecordList, Turn } from '../../models'
import { Sheet } from './index'
import { vi } from 'vitest'

const getSheet = (): HTMLElement => {
  return screen.getByTestId('sheet')
}

test('Sheet: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Sheet
        recordList={new RecordList([new Record()])}
        turn={new Turn(0)}
        jumpTo={() => {}}
        sortRecords={() => {}}
        orderType={'asc'}
      />
    </I18nextProvider>,
  )

  const sheet = getSheet()
  expect(sheet).toBeInTheDocument()
  expect(sheet).toHaveTextContent('Description')
  expect(sheet).toHaveTextContent('Notation')
  expect(sheet).toHaveTextContent('Go to game start')
})

test('Sheet: click sort button', async () => {
  const mockFn = vi.fn()
  render(
    <Sheet
      recordList={new RecordList([new Record()])}
      turn={new Turn(0)}
      jumpTo={() => {}}
      sortRecords={() => mockFn()}
      orderType={'asc'}
    />,
  )
  const user = userEvent.setup()

  const sort = screen.getByTestId('sheet-sort-button')
  await user.click(sort)
  expect(mockFn).toHaveBeenCalled()
})

test('Sheet: click move button', async () => {
  const mockFn = vi.fn()
  render(
    <Sheet
      recordList={new RecordList([new Record()])}
      turn={new Turn(0)}
      jumpTo={() => mockFn()}
      sortRecords={() => {}}
      orderType={'asc'}
    />,
  )
  const user = userEvent.setup()

  const move = screen.getByTestId('sheet-move-button')
  await user.click(move)
  expect(mockFn).toHaveBeenCalled()
})
