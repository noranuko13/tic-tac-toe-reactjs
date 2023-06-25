import React, { useState } from 'react'
import { Squares } from '../../Models/Squares'

interface MoveProps {
  histories: { squares: Squares, xy: number[] }[]
  stepNumber: number
  jumpTo: any
}

export function Move (props: MoveProps) {
  const [order, setOrder] = useState<string>('asc')

  const handleClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  const buttonStyle: string = 'bg-stone-500 hover:bg-stone-400'

  const histories = order === 'asc' ? props.histories.slice() : props.histories.slice().reverse()
  const moves = histories.map((step, index) => {
    const move = order === 'asc' ? index : histories.length - index - 1
    const text = move
      ? 'Go to move #' + move
      : 'Go to game start'
    const xy = step.xy.join(', ') ? `(${step.xy.join(', ')})` : ''
    const active = props.stepNumber === move ? 'active' : ''
    const trStyle: string = 'border-t border-b border-dashed border-stone-400'
    return (
      <tr key={move} className={`${trStyle} ${active}`} data-testid="line">
        <th scope="row" className="py-2 px-3">
          <button data-testid="move-button" onClick={() => props.jumpTo(move)}
            className={`py-1 w-12 rounded font-bold ${buttonStyle}`}>
            #{move}
          </button>
        </th>
        <td data-testid="text" className="px-3">{text}</td>
        <td data-testid="xy" className="px-3">{xy}</td>
      </tr>
    )
  })

  const theadStyle: string = 'bg-stone-300'

  return (
    <div className="flex justify-center">
      <table data-testid="move" role="grid">
        <thead className={theadStyle}>
          <tr>
            <th scope="col" className="py-2 px-3">
              <button data-testid="move-sort-button" onClick={() => handleClick()}
                className={`py-1 w-12 rounded font-bold ${buttonStyle}`}>
                #
              </button>
            </th>
            <th scope="col">Text</th>
            <th scope="col">(x, y)</th>
          </tr>
        </thead>
        <tbody>
          {moves}
        </tbody>
      </table>
    </div>
  )
}
