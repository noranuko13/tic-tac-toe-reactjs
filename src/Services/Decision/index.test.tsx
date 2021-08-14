import { calculateWinner } from './index'

test('Decision: return nothing', () => {
  const squares = Array(9).fill('')
  expect(calculateWinner(squares)).toBe('')
})

test('Decision: return winner', () => {
  const squares = Array(9).fill('')
  squares[2] = 'X'
  squares[5] = 'X'
  squares[8] = 'X'
  expect(calculateWinner(squares)).toBe('X')
})
