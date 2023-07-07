import { Record } from '../Record'
import { AscRecordListIterator } from './asc-record-list-iterator'
import { DescRecordListIterator } from './desc-record-list-iterator'
import { SquareList } from '../SquareList'

export class RecordList {
  private readonly records: Record[]

  constructor(records: Record[]) {
    if (records.length < 1 || 9 < records.length) {
      throw new RangeError('The length of records is 1-9')
    }

    this.records = records
  }

  createRecordList(stepNumber: number): RecordList {
    return new RecordList(this.records.slice(0, stepNumber + 1))
  }

  createLastSquareList(): SquareList {
    return this.records[this.records.length - 1].getSquareList().clone()
  }

  getRecord(index: number): Record {
    return this.records[index]
  }

  addRecord(record: Record) {
    this.records.push(record)
  }

  get length(): number {
    return this.records.length
  }

  ascIterator(): AscRecordListIterator {
    return new AscRecordListIterator(this)
  }

  descIterator(): DescRecordListIterator {
    return new DescRecordListIterator(this)
  }
}
