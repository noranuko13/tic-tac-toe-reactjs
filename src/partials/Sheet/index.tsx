import { useTranslation } from 'react-i18next'
import { OrderType } from '../../constants'
import { Button, TheadTh } from '../../elements'
import { RecordList, Turn } from '../../models'
import './style.scss'

interface SheetProps {
  recordList: RecordList
  turn: Turn
  jumpTo: (step: number) => void
  sortRecords: () => void
  orderType: OrderType
}

export function Sheet(props: SheetProps) {
  const { t } = useTranslation()

  const theadTr = (
    <tr>
      <TheadTh>
        <Button
          data-testid={'sheet-sort-button'}
          onClick={() => props.sortRecords()}
        >
          #
        </Button>
      </TheadTh>
      <TheadTh>{t('move.description')}</TheadTh>
      <TheadTh>{t('move.coordinate')}</TheadTh>
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
        className={props.turn.eq(turnNumber) ? 'active' : ''}
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
        <td data-testid="notation">{iterator.getNextRecord().getNotation()}</td>
      </tr>,
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
