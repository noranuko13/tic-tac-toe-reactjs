import React from 'react'
import { Board } from '../../Partials/Board'
import './style.scss'
import { calculateWinner } from '../../Services/Decision'
import { Move } from '../../Partials/Move'

interface GameState {
  history: { squares: string[], xy: number[] }[]
  stepNumber: number
  xIsNext: boolean
}

export class Game extends React.Component<{}, GameState> {
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(''),
        xy: []
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick (i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares,
        xy: [Math.floor(i / 3) + 1, (i % 3) + 1]
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo (step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render () {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    if (this.state.stepNumber === 9) {
      status = 'It\'s a tie!'
    }

    return (
      <div className="grid game" data-testid="game">
        <article className="game-board">
          <h3 className="status" data-testid="status">{status}</h3>
          <Board squares={current.squares} onClick={(i: number) => this.handleClick(i)} />
        </article>
        <article className="game-info">
          <Move history={history} stepNumber={this.state.stepNumber} jumpTo={(s: number) => { this.jumpTo(s) }} />
        </article>
      </div>
    )
  }
}
