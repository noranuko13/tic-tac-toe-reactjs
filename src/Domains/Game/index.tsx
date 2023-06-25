import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import { Squares } from '../../Models/Squares'
import { Move } from '../../Partials/Move'

export function Game() {
  const [histories, setHistories] = useState<
    { squares: Squares; xy: number[] }[]
  >([
    {
      squares: new Squares(),
      xy: [],
    },
  ])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const slicedHistory = histories.slice(0, stepNumber + 1)
    const currentSquares =
      slicedHistory[slicedHistory.length - 1].squares.clone()
    if (currentSquares.winner() || currentSquares.getSquare(i)) {
      return
    }
    currentSquares.setSquare(i, xIsNext ? 'X' : 'O')
    setHistories(
      slicedHistory.concat([
        {
          squares: currentSquares,
          xy: [Math.floor(i / 3) + 1, (i % 3) + 1],
        },
      ])
    )
    setStepNumber(slicedHistory.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const currentSquares = histories[stepNumber].squares

  const statusText = () => {
    if (stepNumber === 9) {
      return "It's a tie!"
    }

    const winner = currentSquares.winner()
    if (winner) {
      return 'Winner: ' + winner
    }

    return 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const bgStyle: string = 'bg-stone-200 text-stone-950'
  const h1Style: string = 'font-semibold italic'

  return (
    <div className={`h-screen ${bgStyle}`}>
      <div className="container mx-auto max-w-lg py-5">
        <header className="pb-5 text-center">
          <h1
            className={`border-t-4 border-b-4 border-double border-stone-400 py-1 text-xl ${h1Style}`}
          >
            Tic Tac Toe
          </h1>
        </header>
        <main data-testid="game" className="pb-4 flex flex-col sm:flex-row">
          <article className="sm:w-2/5 pb-3 text-center">
            <h3 data-testid="status">{statusText()}</h3>
            <Board squares={currentSquares} onClick={(i) => handleClick(i)} />
          </article>
          <article className="sm:w-3/5 pb-2">
            <Move
              histories={histories}
              stepNumber={stepNumber}
              jumpTo={(s: number) => {
                jumpTo(s)
              }}
            />
          </article>
        </main>
        <footer className="border-t-4 border-double border-stone-400"></footer>
      </div>
    </div>
  )
}
