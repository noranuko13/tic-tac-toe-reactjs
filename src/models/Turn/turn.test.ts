import { Turn } from './turn'

const turn0 = new Turn(0)
const turn3 = new Turn(3)
const turn7 = new Turn(7)
const turn8 = new Turn(8)
const turn9 = new Turn(9)

test('Turn: isDraw', () => {
  expect(turn0.isDraw()).toBe(false)
  expect(turn8.isDraw()).toBe(false)
  expect(turn9.isDraw()).toBe(true)
})

test('Turn: eq', () => {
  expect(turn7.eq(8)).toBe(false)
  expect(turn8.eq(8)).toBe(true)
  expect(turn9.eq(8)).toBe(false)
})

test('Turn: xIsNext', () => {
  expect(turn0.getNextPlayer()).toBe('X')
  expect(turn3.getNextPlayer()).toBe('O')
})

test('Turn: getRecordIndex', () => {
  expect(turn0.getRecordIndex()).toBe(0)
  expect(turn9.getRecordIndex()).toBe(9)
})

test('Turn: createNextTurn', () => {
  expect(turn0.createNextTurn()).toStrictEqual(new Turn(1))
  expect(turn8.createNextTurn()).toStrictEqual(new Turn(9))
})
