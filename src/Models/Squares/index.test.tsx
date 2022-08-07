import { Squares } from './index'

const initSquares = new Squares()

const winXSquares = new Squares([
  '', '', 'X',
  'O', '', 'X',
  'O', '', 'X'
])

const winOSquares = new Squares([
  'O', '', 'X',
  'O', 'X', 'X',
  'O', '', ''
])

test('Squares: constructor: throw RangeError', () => {
  expect(() => new Squares(Array(1).fill(''))).toThrow('The length of squares is 9')
  expect(() => new Squares(Array(10).fill(''))).toThrow('The length of squares is 9')
})

test('Squares: clone', () => {
  const origin = new Squares(['A', '', '', '', '', '', '', '', ''])
  const cloned = origin.clone()
  cloned.setSquare(0, 'X')
  expect(origin.getSquare(0)).toBe('A')
  expect(cloned.getSquare(0)).toBe('X')
})

test('Squares: getSquare', () => {
  expect(winOSquares.getSquare(1)).toBe('')
  expect(winOSquares.getSquare(0)).toBe('O')
  expect(winOSquares.getSquare(4)).toBe('X')
})

test('Squares: setSquare', () => {
  const squares = new Squares(['A', 'B', 'C', '', '', '', '', '', ''])
  squares.setSquare(0, 'X')
  squares.setSquare(1, 'Y')
  squares.setSquare(2, 'Z')
  expect(squares.getSquare(0)).toBe('X')
  expect(squares.getSquare(1)).toBe('Y')
  expect(squares.getSquare(2)).toBe('Z')
})

test('Squares: winner: return nothing', () => {
  expect(initSquares.winner()).toBe('')
})

test('Squares: winner: return winner X', () => {
  expect(winXSquares.winner()).toBe('X')
})

test('Squares: winner: return winner O', () => {
  expect(winOSquares.winner()).toBe('O')
})

test('Squares: victoryLine: return nothing', () => {
  expect(initSquares.victoryLine()).toStrictEqual([])
})

test('Squares: victoryLine: return line', () => {
  expect(winXSquares.victoryLine()).toStrictEqual([2, 5, 8])
})
