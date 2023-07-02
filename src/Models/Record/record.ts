import { SquareList } from '../SquareList'

export class Record {
  private readonly squareList: SquareList
  private readonly xy: number[]

  constructor(squareList: SquareList = new SquareList(), xy: number[] = []) {
    this.squareList = squareList
    this.xy = xy
  }

  getSquareList(): SquareList {
    return this.squareList
  }

  getXyStr(): string {
    return this.xy.length !== 0 ? `(${this.xy.join(', ')})` : ''
  }
}
