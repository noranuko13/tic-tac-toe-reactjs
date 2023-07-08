import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Button } from './index'

test('Button: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Button data-testid={'button'} onClick={() => {}}>
        #
      </Button>
    </I18nextProvider>
  )

  const button = screen.getByTestId('button')
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent('#')
})

test('Button: click', async () => {
  const mockFn = jest.fn()
  render(
    <Button data-testid={'button'} onClick={() => mockFn()}>
      #
    </Button>
  )
  const user = userEvent.setup()

  const button = screen.getByTestId('button')
  await user.click(button)
  expect(mockFn).toHaveBeenCalled()
})
