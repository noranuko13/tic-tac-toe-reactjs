import React, { useState } from 'react'
import { Board } from '../../Partials/Board'
import { Move } from '../../Partials/Move'
import { useTranslation } from 'react-i18next'
import { Main } from '../../Partials/Main'
import { Record } from '../../Models/Record'
import { RecordList } from '../../Models/RecordList'

export function Game() {
  const { t } = useTranslation()
  const [recordList, setRecordList] = useState<RecordList>(
    new RecordList([new Record()])
  )
  const [turnNumber, setTurnNumber] = useState<number>(0)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (i: number) => {
    const currentRecordList = recordList.createRecordList(turnNumber)
    const currentSquareList = currentRecordList.createLastSquareList()
    if (currentSquareList.getWinner() || currentSquareList.getSquare(i)) {
      return
    }
    currentSquareList.setSquare(i, xIsNext ? 'X' : 'O')
    currentRecordList.addRecord(
      new Record(currentSquareList, [(i % 3) + 1, Math.floor(i / 3) + 1])
    )
    setRecordList(currentRecordList)
    setTurnNumber(turnNumber + 1)
    setXIsNext(!xIsNext)
  }

  const currentSquareList = recordList.getRecord(turnNumber).getSquareList()
  const board = (
    <div>
      <h3 data-testid="status">{statusText()}</h3>
      <Board squareList={currentSquareList} onClick={(i) => handleClick(i)} />
    </div>
  )

  const move = (
    <Move
      recordList={recordList}
      stepNumber={turnNumber}
      jumpTo={(step: number) => {
        setTurnNumber(step)
        setXIsNext(step % 2 === 0)
      }}
    />
  )

  return (
    <div data-testid="game">
      <Main board={board} move={move} />
    </div>
  )
}
