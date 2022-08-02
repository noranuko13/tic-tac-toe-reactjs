import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import './style.scss'
import { calculateWinner } from '../../Services/Decision'
import { Move } from '../../Partials/Move'

export function Game () {
  const [history, setHistory] = useState<{ squares: string[], xy: number[] }[]>([{
    squares: Array(9).fill(''),
    xy: []
  }])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const slicedHistory = history.slice(0, stepNumber + 1)
    const current = slicedHistory[slicedHistory.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(slicedHistory.concat([{
      squares,
      xy: [Math.floor(i / 3) + 1, (i % 3) + 1]
    }]))
    setStepNumber(slicedHistory.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const current = history[stepNumber]

  const statusText = () => {
    if (stepNumber === 9) {
      return 'It\'s a tie!'
    }

    const winner = calculateWinner(current.squares)
    if (winner) {
      return 'Winner: ' + winner
    }

    return 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="grid game" data-testid="game">
      <article className="game-board">
        <h3 className="status" data-testid="status">{statusText()}</h3>
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </article>
      <article className="game-info">
        <Move history={history} stepNumber={stepNumber} jumpTo={(s: number) => { jumpTo(s) }} />
      </article>
    </div>
  )
}
