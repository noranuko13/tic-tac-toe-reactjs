import { Record } from '../Record'

export interface IRecordListIterator {
  hasNext(): boolean

  getNextRecord(): Record

  getNextTurnNumber(): number

  advance(): void
}
