import { useState } from 'react'
import { Record, RecordList, Turn } from '../../models'
import { Board, Main, Status } from '../../partials'
import { Console } from '../../partials/Console'
import { Move } from '../Move'

export function Game() {
  const [recordList, setRecordList] = useState<RecordList>(
    new RecordList([new Record()])
  )
  const [turn, setTurn] = useState<Turn>(new Turn(0))

  const handleClick = (i: number) => {
    if (turn.isDraw()) {
      return
    }
    const currentRecordList = recordList.createRecordList(turn.getRecordIndex())
    const currentSquareList = currentRecordList.createLastSquareList()
    if (currentSquareList.getWinner() || currentSquareList.getSquare(i)) {
      return
    }
    currentSquareList.setSquare(i, turn.getNextPlayer())
    currentRecordList.addRecord(
      new Record(currentSquareList, [(i % 3) + 1, Math.floor(i / 3) + 1])
    )
    setRecordList(currentRecordList)
    setTurn(turn.createNextTurn())
  }

  const newGame = () => {
    setRecordList(new RecordList([new Record()]))
    setTurn(new Turn(0))
  }

  const currentSquareList = recordList
    .getRecord(turn.getRecordIndex())
    .getSquareList()
  const status = <Status turn={turn} winner={currentSquareList.getWinner()} />
  const board = (
    <Board squareList={currentSquareList} onClick={(i) => handleClick(i)} />
  )

  const console = <Console newGame={() => newGame()} />

  const move = (
    <Move
      recordList={recordList}
      turn={turn}
      jumpTo={(turnNumber: number) => {
        setTurn(new Turn(turnNumber))
      }}
    />
  )

  return (
    <div data-testid="game">
      <Main board={board} status={status} console={console} move={move} />
    </div>
  )
}
