import React from 'react'
import { Board } from '../../Partials/Board'
import './style.scss'
import { calculateWinner } from '../../Services/Decision'

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
        squares: squares,
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

    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move
        : 'Go to game start'
      const xy = step.xy.join(', ') ? `(${step.xy.join(', ')})` : ''
      return (
        <tr key={move}>
          <th scope="row">
            <button className="secondary" data-testid="move" onClick={() => this.jumpTo(move)}>#{move}</button>
          </th>
          <td data-testid="desc">{desc}</td>
          <td data-testid="xy">{xy}</td>
        </tr>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="grid game" data-testid="game">
        <article className="game-board">
          <h3 className="status" data-testid="status">{status}</h3>
          <Board squares={current.squares} onClick={(i: number) => this.handleClick(i)} />
        </article>
        <article className="game-info">
          <table className="moves" role="grid">
            <tbody>
              {moves}
            </tbody>
          </table>
        </article>
      </div>
    )
  }
}
