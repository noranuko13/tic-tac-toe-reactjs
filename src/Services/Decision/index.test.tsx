import { calculateLine, calculateWinner } from './index'

test('Decision: return nothing', () => {
  const squares = Array(9).fill('')
  expect(calculateWinner(squares)).toBe('')
})

test('Decision: return winner', () => {
  const squares = Array(9).fill('')
  squares[2] = 'X'
  squares[3] = 'O'
  squares[5] = 'X'
  squares[6] = 'O'
  squares[8] = 'X'
  expect(calculateWinner(squares)).toBe('X')
})

test('Decision: calculateLine', () => {
  const squares = Array(9).fill('')
  squares[2] = 'X'
  squares[3] = 'O'
  squares[5] = 'X'
  squares[6] = 'O'
  squares[8] = 'X'
  expect(calculateLine(squares)).toStrictEqual([2, 5, 8])
})
