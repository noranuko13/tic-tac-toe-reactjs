import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import { SquareList } from '../../Models/SquareList'
import { Move } from '../../Partials/Move'
import { Trans } from '../../Elements'

export function Game() {
  const [histories, setHistories] = useState<
    { squareList: SquareList; xy: number[] }[]
  >([
    {
      squareList: new SquareList(),
      xy: [],
    },
  ])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const slicedHistory = histories.slice(0, stepNumber + 1)
    const currentSquareList =
      slicedHistory[slicedHistory.length - 1].squareList.clone()
    if (currentSquareList.winner() || currentSquareList.getSquare(i)) {
      return
    }
    currentSquareList.setSquare(i, xIsNext ? 'X' : 'O')
    setHistories(
      slicedHistory.concat([
        {
          squareList: currentSquareList,
          xy: [(i % 3) + 1, Math.floor(i / 3) + 1],
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

  const currentSquareList = histories[stepNumber].squareList

  const statusText = () => {
    if (stepNumber === 9) {
      return "It's a tie!"
    }

    const winner = currentSquareList.winner()
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
            <Trans text={'title'} />
          </h1>
        </header>
        <main data-testid="game" className="pb-4 flex flex-col sm:flex-row">
          <article className="sm:w-2/5 pb-3 text-center">
            <h3 data-testid="status">{statusText()}</h3>
            <Board
              squareList={currentSquareList}
              onClick={(i) => handleClick(i)}
            />
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
