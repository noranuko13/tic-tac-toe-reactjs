import { calculateLine, calculateWinner } from './index'

const initSquares = (): string[] => {
  return Array(9).fill('')
}

const winX = (): string[] => {
  const squares = initSquares()
  squares[2] = 'X'
  squares[3] = 'O'
  squares[5] = 'X'
  squares[6] = 'O'
  squares[8] = 'X'
  return squares
}

const winO = (): string[] => {
  const squares = initSquares()
  squares[2] = 'X'
  squares[3] = 'O'
  squares[5] = 'X'
  squares[6] = 'O'
  squares[4] = 'X'
  squares[0] = 'O'
  return squares
}

test('Squares: calculateWinner: return nothing', () => {
  expect(calculateWinner(initSquares())).toBe('')
})

test('Squares: calculateWinner: return winner X', () => {
  expect(calculateWinner(winX())).toBe('X')
})

test('Squares: calculateWinner: return winner O', () => {
  expect(calculateWinner(winO())).toBe('O')
})

test('Squares: calculateLine: return nothing', () => {
  expect(calculateLine(initSquares())).toStrictEqual([])
})

test('Squares: calculateLine: return line', () => {
  expect(calculateLine(winX())).toStrictEqual([2, 5, 8])
})
