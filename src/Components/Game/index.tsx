import React from 'react'
import { Board } from '../Board'
import './style.scss'
import { calculateWinner } from '../../Services/Decision'

interface GameState {
  history: { squares: string[] }[]
  xIsNext: boolean
}

export class Game extends React.Component<{}, GameState> {
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill('')
      }],
      xIsNext: true
    }
  }

  handleClick (i: number) {
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }

  render () {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game" data-testid="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i: number) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status" data-testid="status">{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}
