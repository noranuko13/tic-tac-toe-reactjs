import React from 'react'
import { Square } from '../Square'
import './style.scss'
import { calculateWinner } from '../../Services/Decision'

interface BoardState {
  squares: string[]
  xIsNext: boolean
}

export class Board extends React.Component<{}, BoardState> {
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      squares: Array(9).fill(''),
      xIsNext: true
    }
  }

  handleClick (i: number) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare (i: number) {
    return <Square value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />
  }

  render () {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="board" data-testid="board">
        <div className="status" data-testid="status">{status}</div>
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
