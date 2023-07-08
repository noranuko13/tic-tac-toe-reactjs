import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Wrapper } from './index'

const getWrapper = (): HTMLElement => {
  return screen.getByTestId('wrapper')
}

test('Wrapper: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Wrapper>#</Wrapper>
    </I18nextProvider>
  )

  const wrapper = getWrapper()
  expect(wrapper).toBeInTheDocument()
  expect(wrapper).toHaveTextContent('#')
})
