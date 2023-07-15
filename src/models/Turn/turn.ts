export class Turn {
  private readonly turnNumber: number

  constructor(turnNumber: number) {
    this.turnNumber = turnNumber
  }

  isDraw(): boolean {
    return this.turnNumber === 9
  }

  getNextPlayer(): string {
    return this.turnNumber % 2 === 0 ? 'X' : 'O'
  }

  eq(turnNumber: number): boolean {
    return this.turnNumber === turnNumber
  }

  getRecordIndex(): number {
    return this.turnNumber
  }

  createNextTurn(): Turn {
    return new Turn(this.turnNumber + 1)
  }
}
