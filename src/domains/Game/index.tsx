import { useState } from 'react'
import { Record, RecordList } from '../../models'
import { Board, Main, Status } from '../../partials'
import { Move } from '../Move'

export function Game() {
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
      <Status
        turnNumber={turnNumber}
        winner={currentSquareList.getWinner()}
        xIsNext={xIsNext}
      />
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
