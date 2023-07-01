import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import { Move } from '../../Partials/Move'
import { useTranslation } from 'react-i18next'
import { Main } from '../../Partials/Main'
import { Record } from '../../Models/Record'

export function Game() {
  const { t } = useTranslation()
  const [records, setRecords] = useState<Record[]>([new Record()])
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const slicedRecords = records.slice(0, stepNumber + 1)
    const currentSquareList = slicedRecords[slicedRecords.length - 1]
      .getSquareList()
      .clone()
    if (currentSquareList.getWinner() || currentSquareList.getSquare(i)) {
      return
    }
    currentSquareList.setSquare(i, xIsNext ? 'X' : 'O')
    setRecords(
      slicedRecords.concat([
        new Record(currentSquareList, [(i % 3) + 1, Math.floor(i / 3) + 1]),
      ])
    )
    setStepNumber(slicedRecords.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const currentSquareList = records[stepNumber].getSquareList()

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
      records={records}
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
