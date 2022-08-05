import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import './style.scss'
import { Squares } from '../../Models/Squares'
import { Move } from '../../Partials/Move'

export function Game () {
  const [history, setHistory] = useState<{ squares: Squares, xy: number[] }[]>([{
    squares: new Squares(),
    xy: []
  }])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const slicedHistory = history.slice(0, stepNumber + 1)
    const currentSquares = slicedHistory[slicedHistory.length - 1].squares.clone()
    if (currentSquares.calculateWinner() || currentSquares.getSquare(i)) {
      return
    }
    currentSquares.setSquare(i, xIsNext ? 'X' : 'O')
    setHistory(slicedHistory.concat([{
      squares: currentSquares,
      xy: [Math.floor(i / 3) + 1, (i % 3) + 1]
    }]))
    setStepNumber(slicedHistory.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const currentSquares = history[stepNumber].squares

  const statusText = () => {
    if (stepNumber === 9) {
      return 'It\'s a tie!'
    }

    const winner = currentSquares.calculateWinner()
    if (winner) {
      return 'Winner: ' + winner
    }

    return 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="grid game" data-testid="game">
      <article className="game-board">
        <h3 className="status" data-testid="status">{statusText()}</h3>
        <Board squares={currentSquares} onClick={(i: number) => handleClick(i)} />
      </article>
      <article className="game-info">
        <Move history={history} stepNumber={stepNumber} jumpTo={(s: number) => { jumpTo(s) }} />
      </article>
    </div>
  )
}
