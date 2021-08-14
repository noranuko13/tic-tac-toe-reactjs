import React from 'react'
import { Square } from '../Square'
import './style.scss'

interface BoardState {
  squares: string[]
}

export class Board extends React.Component<{}, BoardState> {
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      squares: Array(9).fill('')
    }
  }

  handleClick (i: number) {
    const squares = this.state.squares.slice()
    squares[i] = 'X'
    this.setState({ squares: squares })
  }

  renderSquare (i: number) {
    return <Square value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />
  }

  render () {
    const status = 'Next player: X'

    return (
      <div className="board" data-testid="board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}