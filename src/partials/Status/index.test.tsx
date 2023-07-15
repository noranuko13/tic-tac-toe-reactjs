import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Turn } from '../../models'
import { Status } from './index'

const getStatus = (): HTMLElement => {
  return screen.getByTestId('status')
}

test('Status: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Status turn={new Turn(0)} winner={''} />
    </I18nextProvider>
  )

  const status = getStatus()
  expect(status).toBeInTheDocument()
})

test('Status: render tie', () => {
  render(<Status turn={new Turn(9)} winner={''} />)

  const status = getStatus()
  expect(status).toHaveTextContent("It's a tie!")
})

test('Status: render winner', () => {
  render(<Status turn={new Turn(7)} winner={'X'} />)

  const status = getStatus()
  expect(status).toHaveTextContent('Winner: X')
})

test('Status: render X', () => {
  render(<Status turn={new Turn(0)} winner={''} />)

  const status = getStatus()
  expect(status).toHaveTextContent('Next player: X')
})

test('Status: render O', () => {
  render(<Status turn={new Turn(1)} winner={''} />)

  const status = getStatus()
  expect(status).toHaveTextContent('Next player: O')
})
