import { useTranslation } from 'react-i18next'
import { Turn } from '../../models'
import './style.scss'

interface StatusProps {
  turn: Turn
  winner: string
}

export function Status(props: StatusProps) {
  const { t } = useTranslation()

  const statusInnerText = () => {
    if (props.turn.isDraw()) {
      return t('board.tie')
    }
    if (props.winner) {
      return t('board.winner', { name: props.winner })
    }
    return t('board.next', { name: props.turn.getNextPlayer() })
  }

  return (
    <h3 data-testid="status" className="status">
      {statusInnerText()}
    </h3>
  )
}
