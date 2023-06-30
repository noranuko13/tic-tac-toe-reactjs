import React, { useState } from 'react'
import { SquareList } from '../../Models/SquareList'
import './style.scss'
import { Button } from '../../Elements'

interface MoveProps {
  histories: { squareList: SquareList; xy: number[] }[]
  stepNumber: number
  jumpTo: any
}

export function Move(props: MoveProps) {
  const [order, setOrder] = useState<string>('asc')

  const handleClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  const histories =
    order === 'asc'
      ? props.histories.slice()
      : props.histories.slice().reverse()
  const moves = histories.map((step, index) => {
    const move = order === 'asc' ? index : histories.length - index - 1
    const text = move ? 'Go to move #' + move : 'Go to game start'
    const xy = step.xy.join(', ') ? `(${step.xy.join(', ')})` : ''
    const active = props.stepNumber === move ? 'active' : ''
    return (
      <tr key={move} className={active} data-testid="line">
        <th scope="row">
          <Button
            data-testid={'move-button'}
            onClick={() => props.jumpTo(move)}
          >
            #{move}
          </Button>
        </th>
        <td data-testid="text">{text}</td>
        <td data-testid="xy">{xy}</td>
      </tr>
    )
  })

  return (
    <table data-testid="move" className="move">
      <thead>
        <tr>
          <th scope="col">
            <Button
              data-testid={'move-sort-button'}
              onClick={() => handleClick()}
            >
              #
            </Button>
          </th>
          <th scope="col">Text</th>
          <th scope="col">(x, y)</th>
        </tr>
      </thead>
      <tbody>{moves}</tbody>
    </table>
  )
}
