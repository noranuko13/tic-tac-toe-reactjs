import React, { useState } from 'react'
import './style.scss'
import { Button } from '../../Elements/Button'
import { useTranslation } from 'react-i18next'
import { Record } from '../../Models/Record'

interface MoveProps {
  records: Record[]
  stepNumber: number
  jumpTo: any
}

export function Move(props: MoveProps) {
  const { t } = useTranslation()
  const [order, setOrder] = useState<string>('asc')

  const handleClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  const records =
    order === 'asc' ? props.records.slice() : props.records.slice().reverse()
  const moves = records.map((record, index) => {
    const move = order === 'asc' ? index : records.length - index - 1
    const text = move ? t('move.goto') + move : t('move.start')
    const active = props.stepNumber === move ? 'active' : ''
    return (
      <tr key={move} className={active} data-testid="line">
        <th scope="row">
          <Button
            data-testid={'move-button'}
            onClick={() => props.jumpTo(move)}
          >
            #{move}
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
      <tbody>{moves}</tbody>
    </table>
  )
}
