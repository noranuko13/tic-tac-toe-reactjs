import { useTranslation } from 'react-i18next'
import './style.scss'

interface StatusProps {
  turnNumber: number
  winner: string
  xIsNext: boolean
}

export function Status(props: StatusProps) {
  const { t } = useTranslation()

  const statusInnerText = () => {
    if (props.turnNumber === 9) {
      return t('board.tie')
    }
    if (props.winner) {
      return t('board.winner', { name: props.winner })
    }
    return t('board.next', { name: props.xIsNext ? 'X' : 'O' })
  }

  return (
    <h3 data-testid="status" className="status">
      {statusInnerText()}
    </h3>
  )
}
