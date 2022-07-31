import React, { useState } from 'react'
import './style.scss'

interface MoveProps {
  history: { squares: string[], xy: number[] }[]
  stepNumber: number
  jumpTo: any
}

export function Move (props: MoveProps) {
  const [order, setOrder] = useState<string>('asc')

  const handleClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  const history = order === 'asc' ? props.history.slice() : props.history.slice().reverse()
  const moves = history.map((step, index) => {
    const move = order === 'asc' ? index : history.length - index - 1
    const text = move
      ? 'Go to move #' + move
      : 'Go to game start'
    const xy = step.xy.join(', ') ? `(${step.xy.join(', ')})` : ''
    const active = props.stepNumber === move ? 'active' : ''
    return (
      <tr key={move} className={active} data-testid="line">
        <th scope="row">
          <button className="secondary" data-testid="move-button" onClick={() => props.jumpTo(move)}>#{move}</button>
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
            <button className="secondary" data-testid="move-sort-button" onClick={() => handleClick()}>#</button>
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
