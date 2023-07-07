import { Record } from '../Record'
import { IRecordListIterator } from './i-record-list-iterator'
import { RecordList } from './record-list'

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
