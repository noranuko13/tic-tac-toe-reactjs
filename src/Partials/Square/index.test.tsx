import React from 'react'
import { render, screen } from '@testing-library/react'
import { Square } from './index'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'

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

test('Square: render active', () => {
  render(<Square value={'X'} onClick={() => {}} active={true} />)

  expect(getSquare().classList.contains('active')).toBe(true)
})
