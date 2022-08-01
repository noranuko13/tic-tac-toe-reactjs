import React from 'react'
import { Square } from '../Square'
import './style.scss'
import { calculateLine } from '../../Services/Decision'

interface BoardProps {
  squares: string[]
  onClick: (index: number) => void
}

export function Board (props: BoardProps) {
  const renderSquare = (i: number, line: ReadonlyArray<number>) => {
    return <Square key={i} value={props.squares[i]} active={line.includes(i)}
      onClick={() => props.onClick(i)} />
  }

  const line = calculateLine(props.squares)
  const indexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]

  const squares = indexes.map((rows, index) => {
    return (
      <div key={index} className="board-row">
        {rows.map((row) => {
          return renderSquare(row, line)
        })}
      </div>
    )
  })

  return (
    <div className="board" data-testid="board">
      {squares}
    </div>
  )
}
