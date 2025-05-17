import { useTranslation } from 'react-i18next'
import { OrderType } from '../../constants'
import { Button, TbodyTd, TbodyTh, TheadTh } from '../../elements'
import { RecordList, Turn } from '../../models'
import classNames from 'classnames'

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
        className={classNames(
          'border-b border-t border-dashed border-stone-400',
          props.turn.eq(turnNumber) ? 'active bg-stone-300' : '',
        )}
        data-testid="line"
      >
        <TbodyTh>
          <Button
            data-testid={'sheet-move-button'}
            onClick={() => props.jumpTo(turnNumber)}
          >
            #{turnNumber}
          </Button>
        </TbodyTh>
        <TbodyTd data-testid="text">
          {turnNumber !== 0 ? t('move.goto', { turnNumber }) : t('move.start')}
        </TbodyTd>
        <TbodyTd data-testid="notation">
          {iterator.getNextRecord().getNotation()}
        </TbodyTd>
      </tr>,
    )
    iterator.advance()
  }

  return (
    <table
      data-testid="sheet"
      className={classNames('w-full whitespace-nowrap')}
    >
      <thead>{theadTr}</thead>
      <tbody>{tbodyTrs}</tbody>
    </table>
  )
}
