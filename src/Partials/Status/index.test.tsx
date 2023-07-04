import React from 'react'
import { render, screen } from '@testing-library/react'
import { Status } from './index'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'

const getStatus = (): HTMLElement => {
  return screen.getByTestId('status')
}

test('Status: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Status turnNumber={0} winner={''} xIsNext={true} />
    </I18nextProvider>
  )
  expect(getStatus()).toBeInTheDocument()
})

test('Status: render tie', () => {
  render(<Status turnNumber={9} winner={''} xIsNext={false} />)
  expect(getStatus()).toHaveTextContent("It's a tie!")
})

test('Status: render winner', () => {
  render(<Status turnNumber={7} winner={'X'} xIsNext={false} />)
  expect(getStatus()).toHaveTextContent('Winner: X')
})

test('Status: render X', () => {
  render(<Status turnNumber={0} winner={''} xIsNext={true} />)
  expect(getStatus()).toHaveTextContent('Next player: X')
})

test('Status: render O', () => {
  render(<Status turnNumber={1} winner={''} xIsNext={false} />)
  expect(getStatus()).toHaveTextContent('Next player: O')
})