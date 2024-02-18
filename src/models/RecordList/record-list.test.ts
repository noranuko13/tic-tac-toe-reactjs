import { expect, test } from 'vitest'
import { Record } from '../Record'
import { SquareList } from '../SquareList'
import { AscRecordListIterator } from './asc-record-list-iterator'
import { DescRecordListIterator } from './desc-record-list-iterator'
import { RecordList } from './record-list'

const record0 = new Record()

const squareList1 = new SquareList([
  ...['X', '', ''],
  ...['', '', ''],
  ...['', '', ''],
])
const record1 = new Record(squareList1, 0)

const squareList2 = new SquareList([
  ...['X', 'O', ''],
  ...['', '', ''],
  ...['', '', ''],
])
const record2 = new Record(squareList2, 1)

const squareList3 = new SquareList([
  ...['X', 'O', ''],
  ...['X', '', ''],
  ...['', '', ''],
])
const record3 = new Record(squareList3, 3)

const squareList4 = new SquareList([
  ...['X', 'O', ''],
  ...['X', 'O', ''],
  ...['', '', ''],
])
const record4 = new Record(squareList4, 4)

const squareList5 = new SquareList([
  ...['X', 'O', ''],
  ...['X', 'O', ''],
  ...['X', '', ''],
])
const record5 = new Record(squareList5, 6)

const recordList5 = new RecordList([
  record0,
  record1,
  record2,
  record3,
  record4,
  record5,
])

test('RecordList: constructor: throw RangeError', () => {
  const message = 'The length of records is 1-9'
  expect(() => new RecordList([])).toThrow(message)
  expect(() => new RecordList(Array(10).fill(new Record()))).toThrow(message)
})

test('RecordList: createRecordList', () => {
  expect(recordList5.createRecordList(0)).toStrictEqual(
    new RecordList([record0]),
  )
  expect(recordList5.createRecordList(2)).toStrictEqual(
    new RecordList([record0, record1, record2]),
  )
  expect(recordList5.createRecordList(5)).toStrictEqual(recordList5)
})

test('RecordList: createLastSquareList', () => {
  expect(recordList5.createLastSquareList()).toStrictEqual(squareList5)
})

test('RecordList: getRecord', () => {
  expect(recordList5.getRecord(0)).toStrictEqual(record0)
  expect(recordList5.getRecord(2)).toStrictEqual(record2)
  expect(recordList5.getRecord(5)).toStrictEqual(record5)
})

test('RecordList: addRecord', () => {
  const recordList2 = new RecordList([record0, record1, record2])
  recordList2.addRecord(record3)
  expect(recordList2).toStrictEqual(
    new RecordList([record0, record1, record2, record3]),
  )
  recordList2.addRecord(record4)
  expect(recordList2).toStrictEqual(
    new RecordList([record0, record1, record2, record3, record4]),
  )
})

test('RecordList: length', () => {
  const recordList2 = new RecordList([record0, record1, record2])
  expect(recordList2.length).toBe(3)
  expect(recordList5.length).toBe(6)
})

test('RecordList: ascIterator', () => {
  const iterator = recordList5.ascIterator()
  expect(iterator).toStrictEqual(new AscRecordListIterator(recordList5))
  // #0
  expect(iterator.hasNext()).toBe(true)
  expect(iterator.getNextRecord()).toBe(record0)
  expect(iterator.getNextTurnNumber()).toBe(0)
  // #1-#5
  Array.from(Array(5).keys()).forEach(() => {
    iterator.advance()
  })
  expect(iterator.hasNext()).toBe(true)
  expect(iterator.getNextRecord()).toBe(record5)
  expect(iterator.getNextTurnNumber()).toBe(5)
  iterator.advance()
  expect(iterator.hasNext()).toBe(false)
})

test('RecordList: descIterator', () => {
  const iterator = recordList5.descIterator()
  expect(iterator).toStrictEqual(new DescRecordListIterator(recordList5))
  // #5
  expect(iterator.hasNext()).toBe(true)
  expect(iterator.getNextRecord()).toBe(record5)
  expect(iterator.getNextTurnNumber()).toBe(5)
  // #4-#0
  Array.from(Array(5).keys()).forEach(() => {
    iterator.advance()
  })
  expect(iterator.hasNext()).toBe(true)
  expect(iterator.getNextRecord()).toBe(record0)
  expect(iterator.getNextTurnNumber()).toBe(0)
  iterator.advance()
  expect(iterator.hasNext()).toBe(false)
})
