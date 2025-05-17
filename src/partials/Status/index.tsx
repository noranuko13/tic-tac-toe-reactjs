import { useTranslation } from 'react-i18next'
import { Turn } from '../../models'
import classNames from 'classnames'

interface StatusProps {
  turn: Turn
  winner: string
}

export function Status(props: StatusProps) {
  const { t } = useTranslation()

  const statusInnerText = () => {
    if (props.turn.isDraw()) {
      return t('status.tie')
    }
    if (props.winner) {
      return t('status.winner', { name: props.winner })
    }
    return t('status.next', { name: props.turn.getNextPlayer() })
  }

  return (
    <h3
      data-testid="status"
      className={classNames(
        'text-center text-lg',
        'border-t border-b border-dashed border-stone-400',
      )}
    >
      {statusInnerText()}
    </h3>
  )
}
