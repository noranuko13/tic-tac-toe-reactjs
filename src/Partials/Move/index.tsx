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

  const theadTr = (
    <tr>
      <th scope="col">
        <Button
          data-testid={'move-sort-button'}
          onClick={() => {
            setOrderType(orderType === 'asc' ? 'desc' : 'asc')
          }}
        >
          #
        </Button>
      </th>
      <th scope="col">{t('move.description')}</th>
      <th scope="col">{t('move.coordinate')}</th>
    </tr>
  )

  const iterator =
    orderType === 'asc'
      ? props.recordList.ascIterator()
      : props.recordList.descIterator()
  const tbodyTrs = []
  while (iterator.hasNext()) {
    const turnNumber = iterator.getNextTurnNumber()
    tbodyTrs.push(
      <tr
        key={turnNumber}
        className={props.stepNumber === turnNumber ? 'active' : ''}
        data-testid="line"
      >
        <th scope="row">
          <Button
            data-testid={'move-button'}
            onClick={() => props.jumpTo(turnNumber)}
          >
            #{turnNumber}
          </Button>
        </th>
        <td data-testid="text">
          {turnNumber !== 0 ? t('move.goto', { turnNumber }) : t('move.start')}
        </td>
        <td data-testid="xy">{iterator.getNextRecord().getXyStr()}</td>
      </tr>
    )
    iterator.advance()
  }

  return (
    <table data-testid="move" className="move">
      <thead>{theadTr}</thead>
      <tbody>{tbodyTrs}</tbody>
    </table>
  )
}
