import React, { useState } from 'react'
import './style.scss'
import { Button } from '../../Elements/Button'
import { useTranslation } from 'react-i18next'
import { RecordList } from '../../Models/RecordList'
import { OrderType } from '../../constants'

interface MoveProps {
  recordList: RecordList
  stepNumber: number
  jumpTo: any
}

export function Move(props: MoveProps) {
  const { t } = useTranslation()
  const [orderType, setOrderType] = useState<OrderType>('asc')

  const handleClick = () => {
    setOrderType(orderType === 'asc' ? 'desc' : 'asc')
  }

  const iterator =
    orderType === 'asc'
      ? props.recordList.ascIterator()
      : props.recordList.descIterator()
  const moveTrs = []
  while (iterator.hasNext()) {
    const record = iterator.getNextRecord()
    const turnNumber = iterator.getNextTurnNumber()
    const text = turnNumber ? t('move.goto') + turnNumber : t('move.start')
    const active = props.stepNumber === turnNumber ? 'active' : ''
    moveTrs.push(
      <tr key={turnNumber} className={active} data-testid="line">
        <th scope="row">
          <Button
            data-testid={'move-button'}
            onClick={() => props.jumpTo(turnNumber)}
          >
            #{turnNumber}
          </Button>
        </th>
        <td data-testid="text">{text}</td>
        <td data-testid="xy">{record.getXyStr()}</td>
      </tr>
    )
    iterator.advance()
  }

  return (
    <table data-testid="move" className="move">
      <thead>
        <tr>
          <th scope="col">
            <Button
              data-testid={'move-sort-button'}
              onClick={() => handleClick()}
            >
              #
            </Button>
          </th>
          <th scope="col">{t('move.description')}</th>
          <th scope="col">{t('move.coordinate')}</th>
        </tr>
      </thead>
      <tbody>{moveTrs}</tbody>
    </table>
  )
}
