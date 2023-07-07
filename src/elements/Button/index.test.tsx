import { render, screen } from '@testing-library/react'
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

  const e = screen.getByTestId('button')
  expect(e).toBeInTheDocument()
  expect(e).toHaveTextContent('#')
})
