import React from 'react'
import { BOARD_ROWS } from '../../constants'
import { SquareList } from '../../models'
import { Square } from '../Square'
import classNames from 'classnames'

interface BoardProps {
  squareList: SquareList
  moveForward: (index: number) => void
}

export function Board(props: BoardProps) {
  const BOARD_FILES = ['a', 'b', 'c']
  return (
    <div
      data-testid="board"
      className={classNames('mx-auto flex w-40 flex-wrap text-xl')}
    >
      <div className={classNames('h-6 w-4')}></div>
      {BOARD_FILES.map((file) => {
        return (
          <button
            key={file}
            className={classNames('mb-1 h-6 w-12 cursor-default')}
          >
            {file}
          </button>
        )
      })}
      {BOARD_ROWS.map((rows, index) => {
        return (
          <React.Fragment key={index}>
            <button className={classNames('h-12 w-4 cursor-default')}>
              {index + 1}
            </button>
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
