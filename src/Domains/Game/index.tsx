import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import { Move } from '../../Partials/Move'
import { useTranslation } from 'react-i18next'
import { Main } from '../../Partials/Main'
import { Record } from '../../Models/Record'
import { RecordList } from '../../Models/RecordList/record-list'

export function Game() {
  const { t } = useTranslation()
  const [recordList, setRecordList] = useState<RecordList>(
    new RecordList([new Record()])
  )
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const currentRecordList = recordList.createRecordList(stepNumber)
    const currentSquareList = currentRecordList.createLastSquareList()
    if (currentSquareList.getWinner() || currentSquareList.getSquare(i)) {
      return
    }
    currentSquareList.setSquare(i, xIsNext ? 'X' : 'O')
    currentRecordList.addRecord(
      new Record(currentSquareList, [(i % 3) + 1, Math.floor(i / 3) + 1])
    )
    setRecordList(currentRecordList)
    setStepNumber(stepNumber + 1)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const currentSquareList = recordList.getRecord(stepNumber).getSquareList()

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
      recordList={recordList}
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
