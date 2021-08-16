import React from 'react'
import './style.scss'

interface MoveProps {
  history: { squares: string[], xy: number[] }[]
  stepNumber: number
  jumpTo: any
}

interface MoveState {
  order: string
}

export class Move extends React.Component<MoveProps, MoveState> {
  constructor (props: MoveProps | Readonly<MoveProps>) {
    super(props)
    this.state = {
      order: 'asc'
    }
  }

  handleClick () {
    this.setState({
      order: this.state.order === 'asc' ? 'desc' : 'asc'
    })
  }

  render () {
    const history = this.state.order === 'asc' ? this.props.history.slice() : this.props.history.slice().reverse()
    const moves = history.map((step, index) => {
      const move = this.state.order === 'asc' ? index : history.length - index - 1
      const text = move
        ? 'Go to move #' + move
        : 'Go to game start'
      const xy = step.xy.join(', ') ? `(${step.xy.join(', ')})` : ''
      const active = this.props.stepNumber === move ? 'active' : ''
      return (
        <tr key={move} className={active} data-testid="line">
          <th scope="row">
            <button className="secondary" data-testid="move-button" onClick={() => this.props.jumpTo(move)}>#{move}</button>
          </th>
          <td data-testid="text">{text}</td>
          <td data-testid="xy">{xy}</td>
        </tr>
      )
    })

    return (
      <table className="move" data-testid="move" role="grid">
        <thead>
          <tr>
            <th scope="col">
              <button className="secondary" data-testid="move-sort-button" onClick={() => this.handleClick()}>#</button>
            </th>
            <th scope="col">Text</th>
            <th scope="col">(x, y)</th>
          </tr>
        </thead>
        <tbody>
          {moves}
        </tbody>
      </table>
    )
  }
}
