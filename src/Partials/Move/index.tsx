import React, { useState } from 'react'
import './style.scss'
import { Button } from '../../Elements/Button'
import { useTranslation } from 'react-i18next'
import { Record } from '../../Models/Record'
import { OrderType } from '../../constants'

interface MoveProps {
  records: Record[]
  stepNumber: number
  jumpTo: any
}

export function Move(props: MoveProps) {
  const { t } = useTranslation()
  const [orderType, setOrderType] = useState<OrderType>('asc')

  const handleClick = () => {
    setOrderType(orderType === 'asc' ? 'desc' : 'asc')
  }

  const records =
    orderType === 'asc'
      ? props.records.slice()
      : props.records.slice().reverse()
  const moveTrs = records.map((record, index) => {
    const turnNumber = orderType === 'asc' ? index : records.length - index - 1
    const text = turnNumber ? t('move.goto') + turnNumber : t('move.start')
    const active = props.stepNumber === turnNumber ? 'active' : ''
    return (
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
  })

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
