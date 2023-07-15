import { SquareList } from '../SquareList'

export class Record {
  private readonly squareList: SquareList
  private readonly index: number

  constructor(squareList: SquareList = new SquareList(), index: number = -1) {
    this.squareList = squareList
    if (index < -1 || 8 < index) {
      throw new RangeError('Index range from -1 to 8')
    }
    this.index = index
  }

  getSquareList(): SquareList {
    return this.squareList
  }

  getNotation(): string {
    if (this.index === -1) {
      return ''
    }
    const fileString = () => {
      switch (this.index % 3) {
        case 0:
          return 'a'
        case 1:
          return 'b'
        case 2:
          return 'c'
      }
    }
    const rankString = () => {
      const index = Math.floor(this.index / 3) + 1
      return index.toString()
    }
    return `${fileString()}${rankString()}`
  }
}
