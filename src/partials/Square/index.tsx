import { useMemo } from 'react'
import './style.scss'

interface SquareProps {
  value: string
  active: boolean
  moveForward: () => void
}

export function Square(props: SquareProps) {
  const buttonClassName = useMemo<string>(() => {
    const classNames = ['square']
    if (props.active) {
      classNames.push('active')
    }
    return classNames.join(' ')
  }, [props.active])

  return (
    <button
      data-testid="square"
      onClick={() => props.moveForward()}
      className={buttonClassName}
    >
      {props.value}
    </button>
  )
}
