import React from 'react'
import './style.scss'

interface SquareProps {
  value: string
  active: boolean
  onClick: () => void
}

export function Square (props: SquareProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onClick()
    }
  }
  const className = `contrast outline square${props.active ? ' active' : ''}`

  return (
    <div className={className} data-testid="square" tabIndex={0}
      onClick={() => props.onClick()} onKeyPress={(e) => handleKeyPress(e)}>
      {props.value}
    </div>
  )
}
