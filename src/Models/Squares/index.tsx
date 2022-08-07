import { LINES } from '../../constants'

export class Squares {
  squares: string[]

  constructor (squares: string[] = Array(9).fill('')) {
    if (squares.length !== 9) {
      throw new RangeError('The length of squares is 9')
    }

    this.squares = squares
  }

  clone (): Squares {
    return new Squares(this.squares.slice())
  }

  getSquare (index: number): string {
    return this.squares[index]
  }

  setSquare (index: number, square: string) {
    this.squares[index] = square
  }

  calculateWinner (): string {
    const index = this.indexOfWinner()
    if (index !== -1) {
      return this.squares[LINES[index][0]]
    }
    return ''
  }

  calculateLine (): ReadonlyArray<number> {
    const index = this.indexOfWinner()
    if (index !== -1) {
      return LINES[index]
    }
    return []
  }

  private indexOfWinner (): number {
    for (let i = 0; i < LINES.length; i++) {
      const [a, b, c] = LINES[i]
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return i
      }
    }

    return -1
  }
}
