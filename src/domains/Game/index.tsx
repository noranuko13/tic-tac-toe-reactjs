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

  const moveForward = (index: number) => {
    if (turn.isDraw()) {
      return
    }
    const currentRecordList = recordList.createRecordList(turn.getRecordIndex())
    const squareList = currentRecordList.createLastSquareList()
    if (squareList.getWinner() || squareList.getSquare(index)) {
      return
    }
    squareList.setSquare(index, turn.getNextPlayer())
    currentRecordList.addRecord(
      new Record(squareList, [(index % 3) + 1, Math.floor(index / 3) + 1])
    )
    setRecordList(currentRecordList)
    setTurn(turn.createNextTurn())
  }

  const newGame = () => {
    setRecordList(new RecordList([new Record()]))
    setTurn(new Turn(0))
  }

  const squareList = recordList.getRecord(turn.getRecordIndex()).getSquareList()

  return (
    <div data-testid="game">
      <Main
        board={
          <Board
            squareList={squareList}
            moveForward={(index: number) => moveForward(index)}
          />
        }
        status={<Status turn={turn} winner={squareList.getWinner()} />}
        console={<Console newGame={() => newGame()} />}
        move={
          <Move
            recordList={recordList}
            turn={turn}
            jumpTo={(turnNumber: number) => setTurn(new Turn(turnNumber))}
          />
        }
      />
    </div>
  )
}
