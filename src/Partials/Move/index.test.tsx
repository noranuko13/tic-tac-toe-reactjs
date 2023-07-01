import React from 'react'
import { render, screen } from '@testing-library/react'
import { Move } from './index'
import { SquareList } from '../../Models/SquareList'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '../../i18n'

test('Move: render', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <Move
        histories={[
          {
            squareList: new SquareList(),
            xy: [],
          },
        ]}
        stepNumber={0}
        jumpTo={() => {}}
      />
    </I18nextProvider>
  )

  const e = screen.getByTestId('move')
  expect(e).toBeInTheDocument()
})
