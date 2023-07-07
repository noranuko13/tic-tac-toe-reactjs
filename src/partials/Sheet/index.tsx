import React from 'react'
import './style.scss'
import { Button } from '../../elements'
import { useTranslation } from 'react-i18next'
import { RecordList } from '../../models'
import { OrderType } from '../../constants'

interface SheetProps {
  recordList: RecordList
  stepNumber: number
  jumpTo: (step: number) => void
  sortRecords: () => void
  orderType: OrderType
}

export function Sheet(props: SheetProps) {
  const { t } = useTranslation()

  const theadTr = (
    <tr>
      <th scope="col">
        <Button
          data-testid={'sheet-sort-button'}
          onClick={() => props.sortRecords()}
        >
          #
        </Button>
      </th>
      <th scope="col">{t('move.description')}</th>
      <th scope="col">{t('move.coordinate')}</th>
    </tr>
  )

  const iterator =
    props.orderType === 'asc'
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
            data-testid={'sheet-move-button'}
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
    <table data-testid="sheet" className="sheet">
      <thead>{theadTr}</thead>
      <tbody>{tbodyTrs}</tbody>
    </table>
  )
}
