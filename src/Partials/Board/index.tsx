import React from 'react'
import { Square } from '../Square'
import './style.scss'
import { calculateLine } from '../../Services/Decision'

interface BoardProps {
  squares: string[]
  onClick: any
}

export class Board extends React.Component<BoardProps, {}> {
  renderSquare (i: number, line: number[]) {
    return <Square key={i} value={this.props.squares[i]} active={line.includes(i)}
      onClick={() => this.props.onClick(i)} />
  }

  render () {
    const line = calculateLine(this.props.squares)
    const indexes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]

    const squares = indexes.map((rows, index) => {
      return (
        <div key={index} className="board-row">
          {rows.map((row) => {
            return this.renderSquare(row, line)
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
}
