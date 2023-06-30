import React from 'react'
import { Square } from '../Square'
import { SquareList } from '../../Models/SquareList'
import { BOARD_ROWS } from '../../constants'
import './style.scss'

interface BoardProps {
  squareList: SquareList
  onClick: (index: number) => void
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
                  active={props.squareList.victoryLine().includes(r)}
                  onClick={() => props.onClick(r)}
                />
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}
