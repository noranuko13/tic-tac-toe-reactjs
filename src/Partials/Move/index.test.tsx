import React from 'react'
import { render, screen } from '@testing-library/react'
import { Move } from './index'
import { SquareList } from '../../Models/SquareList'

test('Move: render', () => {
  render(
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
  )

  const e = screen.getByTestId('move')
  expect(e).toBeInTheDocument()
})
