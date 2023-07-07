import { Record } from '../Record'
import { IRecordListIterator } from './i-record-list-iterator'
import { RecordList } from './record-list'

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
