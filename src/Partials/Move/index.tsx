import React from 'react'
import './style.scss'

interface MoveProps {
  history: { squares: string[], xy: number[] }[]
  stepNumber: number
  jumpTo: any
}

export class Move extends React.Component<MoveProps, {}> {
  render () {
    const moves = this.props.history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move
        : 'Go to game start'
      const xy = step.xy.join(', ') ? `(${step.xy.join(', ')})` : ''
      const active = this.props.stepNumber === move ? 'active' : ''
      return (
        <tr key={move} className={active} data-testid="line">
          <th scope="row">
            <button className="secondary" data-testid="move-button" onClick={() => this.props.jumpTo(move)}>#{move}</button>
          </th>
          <td data-testid="desc">{desc}</td>
          <td data-testid="xy">{xy}</td>
        </tr>
      )
    })

    return (
      <table className="move" data-testid="move" role="grid">
        <tbody>
          {moves}
        </tbody>
      </table>
    )
  }
}
