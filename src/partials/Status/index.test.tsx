import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Status } from './index'

const getStatus = (): HTMLElement => {
  return screen.getByTestId('status')
}

test('Status: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Status turnNumber={0} winner={''} xIsNext={true} />
    </I18nextProvider>
  )

  const status = getStatus()
  expect(status).toBeInTheDocument()
})

test('Status: render tie', () => {
  render(<Status turnNumber={9} winner={''} xIsNext={false} />)

  const status = getStatus()
  expect(status).toHaveTextContent("It's a tie!")
})

test('Status: render winner', () => {
  render(<Status turnNumber={7} winner={'X'} xIsNext={false} />)

  const status = getStatus()
  expect(status).toHaveTextContent('Winner: X')
})

test('Status: render X', () => {
  render(<Status turnNumber={0} winner={''} xIsNext={true} />)

  const status = getStatus()
  expect(status).toHaveTextContent('Next player: X')
})

test('Status: render O', () => {
  render(<Status turnNumber={1} winner={''} xIsNext={false} />)

  const status = getStatus()
  expect(status).toHaveTextContent('Next player: O')
})
