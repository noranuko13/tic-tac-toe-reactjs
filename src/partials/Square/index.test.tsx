import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Square } from './index'

const getSquare = (): HTMLElement => {
  return screen.getByTestId('square')
}

test('Square: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Square value={''} moveForward={() => {}} active={false} />
    </I18nextProvider>,
  )

  const square = getSquare()
  expect(square).toBeInTheDocument()
  expect(square.classList.contains('active')).toBe(false)
  expect(square.textContent).toBe('')
})

test('Square: render X', () => {
  render(<Square value={'X'} moveForward={() => {}} active={false} />)

  const square = getSquare()
  expect(square.textContent).toBe('X')
})

test('Square: active', () => {
  render(<Square value={'X'} moveForward={() => {}} active={true} />)

  const square = getSquare()
  expect(square.classList.contains('active')).toBe(true)
})

test('Square: not active', () => {
  render(<Square value={'X'} moveForward={() => {}} active={false} />)

  const square = getSquare()
  expect(square.classList.contains('active')).toBe(false)
})

test('Square: click', async () => {
  const mockFn = jest.fn()
  render(<Square value={'X'} moveForward={() => mockFn()} active={false} />)
  const user = userEvent.setup()

  const square = getSquare()
  await user.click(square)
  expect(mockFn).toHaveBeenCalled()
})
