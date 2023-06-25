import React from 'react'
import { Square } from '../Square'
import { Squares } from '../../Models/Squares'
import { BOARD_COLUMNS } from '../../constants'

interface BoardProps {
  squares: Squares
  onClick: (index: number) => void
}

export function Board (props: BoardProps) {
  const squares = BOARD_COLUMNS.map((rows, index) => {
    return (
      <div key={index}>
        {rows.map((row) => {
          return <Square key={row} value={props.squares.getSquare(row)}
            active={props.squares.victoryLine().includes(row)} onClick={() => props.onClick(row)} />
        })}
      </div>
    )
  })

  return (
    <div data-testid="board" className="flex justify-center">
      {squares}
    </div>
  )
}
