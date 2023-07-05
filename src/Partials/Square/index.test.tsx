import React from 'react'
import { render, screen } from '@testing-library/react'
import { Square } from './index'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import userEvent from '@testing-library/user-event'

const getSquare = (): HTMLElement => {
  return screen.getByTestId('square')
}

test('Square: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Square value={''} onClick={() => {}} active={false} />
    </I18nextProvider>
  )

  const e = getSquare()
  expect(e).toBeInTheDocument()
  expect(e.classList.contains('active')).toBe(false)
  expect(e.textContent).toBe('')
})

test('Square: render X', () => {
  render(<Square value={'X'} onClick={() => {}} active={false} />)

  expect(getSquare().textContent).toBe('X')
})

test('Square: active', () => {
  render(<Square value={'X'} onClick={() => {}} active={true} />)

  expect(getSquare().classList.contains('active')).toBe(true)
})

test('Square: not active', () => {
  render(<Square value={'X'} onClick={() => {}} active={false} />)

  expect(getSquare().classList.contains('active')).toBe(false)
})

test('Square: click', async () => {
  const mockFn = jest.fn()
  render(<Square value={'X'} onClick={() => mockFn()} active={false} />)
  const user = userEvent.setup()

  const square = getSquare()
  await user.click(square)
  expect(mockFn).toHaveBeenCalled()
})
