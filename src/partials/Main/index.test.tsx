import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'
import { Main } from './index'

const getMain = (): HTMLElement => {
  return screen.getByTestId('main')
}

test('Main: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Main
        board={<>#board</>}
        status={<>#status</>}
        console={<>#console</>}
        move={<>#move</>}
      />
    </I18nextProvider>
  )

  const main = getMain()
  expect(main).toBeInTheDocument()
  expect(main).toHaveTextContent('#board')
  expect(main).toHaveTextContent('#status')
  expect(main).toHaveTextContent('#console')
  expect(main).toHaveTextContent('#move')
})
