import { RecordList } from './record-list'
import { IRecordListIterator } from './i-record-list-iterator'
import { Record } from '../Record'

export class AscRecordListIterator implements IRecordListIterator {
  private recordList: RecordList
  private turnNumber: number

  constructor(recordList: RecordList) {
    this.recordList = recordList
    this.turnNumber = 0
  }

  hasNext(): boolean {
    return this.turnNumber < this.recordList.length
  }

  getNextRecord(): Record {
    return this.recordList.getRecord(this.turnNumber)
  }

  getNextTurnNumber(): number {
    return this.turnNumber
  }

  advance() {
    this.turnNumber++
  }
}
