import React from 'react'
import { BOARD_ROWS } from '../../constants'
import { SquareList } from '../../models'
import { Square } from '../Square'
import './style.scss'

interface BoardProps {
  squareList: SquareList
  moveForward: (index: number) => void
}

export function Board(props: BoardProps) {
  const BOARD_FILES = ['a', 'b', 'c']
  return (
    <div data-testid="board" className="board">
      <div className="corner"></div>
      {BOARD_FILES.map((file) => {
        return (
          <button key={file} className="file">
            {file}
          </button>
        )
      })}
      {BOARD_ROWS.map((rows, index) => {
        return (
          <React.Fragment key={index}>
            <button className="rank">{index + 1}</button>
            {rows.map((r) => {
              return (
                <Square
                  key={r}
                  value={props.squareList.getSquare(r)}
                  active={props.squareList.isActive(r)}
                  moveForward={() => props.moveForward(r)}
                />
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}
