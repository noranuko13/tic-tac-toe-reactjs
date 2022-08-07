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

test('Squares: calculateWinner: return nothing', () => {
  expect(initSquares.calculateWinner()).toBe('')
})

test('Squares: calculateWinner: return winner X', () => {
  expect(winXSquares.calculateWinner()).toBe('X')
})

test('Squares: calculateWinner: return winner O', () => {
  expect(winOSquares.calculateWinner()).toBe('O')
})

test('Squares: calculateLine: return nothing', () => {
  expect(initSquares.calculateLine()).toStrictEqual([])
})

test('Squares: calculateLine: return line', () => {
  expect(winXSquares.calculateLine()).toStrictEqual([2, 5, 8])
})
