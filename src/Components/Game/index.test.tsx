import React from 'react'
import { render, screen } from '@testing-library/react'
import { Game } from './index'

test('Game: render', () => {
  render(<Game />)

  const e = screen.getByTestId('game')
  expect(e).toBeInTheDocument()
})
