import React from 'react'
import { render, screen } from '@testing-library/react'
import { Board } from './index'
import { SquareList } from '../../Models/SquareList'

test('Board: render', () => {
  render(<Board squareList={new SquareList()} onClick={() => {}} />)

  const e = screen.getByTestId('board')
  expect(e).toBeInTheDocument()
})
