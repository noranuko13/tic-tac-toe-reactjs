import { VICTORY_LINES } from '../../constants'

export class SquareList {
  squares: string[]

  constructor(squares: string[] = Array(9).fill('')) {
    if (squares.length !== 9) {
      throw new RangeError('The length of squares is 9')
    }

    this.squares = squares
  }

  clone(): SquareList {
    return new SquareList(this.squares.slice())
  }

  getSquare(index: number): string {
    return this.squares[index]
  }

  setSquare(index: number, square: string) {
    this.squares[index] = square
  }

  getWinner(): string {
    const index = this.indexOfWinner()
    if (index !== -1) {
      return this.squares[VICTORY_LINES[index][0]]
    }
    return ''
  }

  isActive(index: number): boolean {
    return this.victoryLine().includes(index)
  }

  private victoryLine(): ReadonlyArray<number> {
    const index = this.indexOfWinner()
    if (index !== -1) {
      return VICTORY_LINES[index]
    }
    return []
  }

  private indexOfWinner(): number {
    for (let i = 0; i < VICTORY_LINES.length; i++) {
      const [a, b, c] = VICTORY_LINES[i]
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return i
      }
    }

    return -1
  }
}
