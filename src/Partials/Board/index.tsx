import React from 'react'
import { Square } from '../Square'
import './style.scss'
import { Squares } from '../../Models/Squares'
import { COLUMNS } from '../../constants'

interface BoardProps {
  squares: Squares
  onClick: (index: number) => void
}

export function Board (props: BoardProps) {
  const renderSquare = (i: number, line: ReadonlyArray<number>) => {
    return <Square key={i} value={props.squares.getSquare(i)} active={line.includes(i)}
      onClick={() => props.onClick(i)} />
  }

  const line = props.squares.calculateLine()

  const squares = COLUMNS.map((rows, index) => {
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
