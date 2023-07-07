import { SquareList } from '../SquareList'
import { Record } from './record'

const startRecord = new Record()

const tieSquareList = new SquareList([
  ...['X', 'X', 'O'],
  ...['O', 'O', 'X'],
  ...['X', 'O', 'X'],
])

const tieXy = [3, 3]

const tieRecord = new Record(tieSquareList, tieXy)

test('Record: getSquareList: return nothing', () => {
  expect(startRecord.getSquareList()).toStrictEqual(new SquareList())
})

test('Record: getSquareList: return tie', () => {
  expect(tieRecord.getSquareList()).toBe(tieSquareList)
})

test('Record: getXyStr: return nothing', () => {
  expect(startRecord.getXyStr()).toBe('')
})

test('Record: getXyStr: return tie', () => {
  expect(tieRecord.getXyStr()).toBe('(3, 3)')
})
