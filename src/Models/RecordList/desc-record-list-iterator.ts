import { RecordList } from './record-list'
import { IRecordListIterator } from './i-record-list-iterator'
import { Record } from '../Record'

export class DescRecordListIterator implements IRecordListIterator {
  private recordList: RecordList
  private turnNumber: number

  constructor(recordList: RecordList) {
    this.recordList = recordList
    this.turnNumber = recordList.length - 1
  }

  hasNext(): boolean {
    return this.turnNumber >= 0
  }

  getNextRecord(): Record {
    return this.recordList.getRecord(this.turnNumber)
  }

  getNextTurnNumber(): number {
    return this.turnNumber
  }

  advance() {
    this.turnNumber--
  }
}
