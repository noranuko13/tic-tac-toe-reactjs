import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import { SquareList } from '../../Models/SquareList'
import { Move } from '../../Partials/Move'
import { useTranslation } from 'react-i18next'
import { Main } from '../../Partials/Main'

export function Game() {
  const { t } = useTranslation()
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
    if (currentSquareList.getWinner() || currentSquareList.getSquare(i)) {
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
      return t('board.tie')
    }

    const winner = currentSquareList.getWinner()
    if (winner) {
      return t('board.winner') + winner
    }

    return t('board.next', { name: xIsNext ? 'X' : 'O' })
  }

  const board = (
    <div>
      <h3 data-testid="status">{statusText()}</h3>
      <Board squareList={currentSquareList} onClick={(i) => handleClick(i)} />
    </div>
  )

  const move = (
    <Move
      histories={histories}
      stepNumber={stepNumber}
      jumpTo={(s: number) => {
        jumpTo(s)
      }}
    />
  )

  return (
    <div data-testid="game">
      <Main board={board} move={move} />
    </div>
  )
}
