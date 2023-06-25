import React from 'react'
import { Square } from '../Square'
import { SquareList } from '../../Models/SquareList'
import { BOARD_COLUMNS } from '../../constants'

interface BoardProps {
  squareList: SquareList
  onClick: (index: number) => void
}

export function Board(props: BoardProps) {
  const squares = BOARD_COLUMNS.map((rows, index) => {
    return (
      <div key={index}>
        {rows.map((row) => {
          return (
            <Square
              key={row}
              value={props.squareList.getSquare(row)}
              active={props.squareList.victoryLine().includes(row)}
              onClick={() => props.onClick(row)}
            />
          )
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
