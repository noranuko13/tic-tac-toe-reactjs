import React, { useMemo } from 'react'
import './style.css'

interface SquareProps {
  value: string
  active: boolean
  onClick: () => void
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
      onClick={() => props.onClick()}
      className={buttonClassName}
    >
      {props.value}
    </button>
  )
}
