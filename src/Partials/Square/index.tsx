import React from 'react'
import './style.scss'

interface SquareProps {
  value: string
  active: boolean
  onClick: () => void
}

export function Square (props: SquareProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      props.onClick()
    }
  }
  const className = `contrast outline square${props.active ? ' active' : ''}`

  return (
    <div className={className} data-testid="square" tabIndex={0}
      onClick={() => props.onClick()} onKeyDown={(e) => handleKeyDown(e)}>
      {props.value}
    </div>
  )
}
