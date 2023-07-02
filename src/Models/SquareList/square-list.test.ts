import { SquareList } from './square-list'

const initSquareList = new SquareList()

const winXSquareList = new SquareList([
  ...['', '', 'X'],
  ...['O', '', 'X'],
  ...['O', '', 'X'],
])

const winOSquareList = new SquareList([
  ...['O', '', 'X'],
  ...['O', 'X', 'X'],
  ...['O', '', ''],
])

test('SquareList: constructor: throw RangeError', () => {
  expect(() => new SquareList(Array(1).fill(''))).toThrow(
    'The length of squares is 9'
  )
  expect(() => new SquareList(Array(10).fill(''))).toThrow(
    'The length of squares is 9'
  )
})

test('SquareList: clone', () => {
  const origin = new SquareList([
    ...['A', '', ''],
    ...['', '', ''],
    ...['', '', ''],
  ])
  const cloned = origin.clone()
  cloned.setSquare(0, 'X')
  expect(origin.getSquare(0)).toBe('A')
  expect(cloned.getSquare(0)).toBe('X')
})

test('SquareList: getSquare', () => {
  expect(winOSquareList.getSquare(1)).toBe('')
  expect(winOSquareList.getSquare(0)).toBe('O')
  expect(winOSquareList.getSquare(4)).toBe('X')
})

test('SquareList: setSquare', () => {
  const squareList = new SquareList([
    ...['A', 'B', 'C'],
    ...['', '', ''],
    ...['', '', ''],
  ])
  squareList.setSquare(0, 'X')
  squareList.setSquare(1, 'Y')
  squareList.setSquare(2, 'Z')
  expect(squareList.getSquare(0)).toBe('X')
  expect(squareList.getSquare(1)).toBe('Y')
  expect(squareList.getSquare(2)).toBe('Z')
})

test('SquareList: getWinner: return nothing', () => {
  expect(initSquareList.getWinner()).toBe('')
})

test('SquareList: getWinner: return winner X', () => {
  expect(winXSquareList.getWinner()).toBe('X')
})

test('SquareList: getWinner: return winner O', () => {
  expect(winOSquareList.getWinner()).toBe('O')
})

test('SquareList: victoryLine: return nothing', () => {
  expect(initSquareList.victoryLine()).toStrictEqual([])
})

test('SquareList: victoryLine: return line', () => {
  expect(winXSquareList.victoryLine()).toStrictEqual([2, 5, 8])
})
