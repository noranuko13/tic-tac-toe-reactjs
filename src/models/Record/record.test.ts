import { SquareList } from '../SquareList'
import { Record } from './record'

const startRecord = new Record()

const tieSquareList = new SquareList([
  ...['X', 'X', 'O'],
  ...['O', 'O', 'X'],
  ...['X', 'O', 'X'],
])

const tieRecord = new Record(tieSquareList, 8)

test('Record: constructor: throw RangeError', () => {
  const message = 'Index range from -1 to 8'
  expect(() => new Record(tieSquareList, -2)).toThrow(message)
  expect(() => new Record(tieSquareList, 9)).toThrow(message)
})

test('Record: getSquareList: return nothing', () => {
  expect(startRecord.getSquareList()).toStrictEqual(new SquareList())
})

test('Record: getSquareList: return tie', () => {
  expect(tieRecord.getSquareList()).toBe(tieSquareList)
})

test('Record: getNotation: return nothing', () => {
  expect(startRecord.getNotation()).toBe('')
})

test('Record: getNotation: return tie', () => {
  expect(tieRecord.getNotation()).toBe('c3')
})
