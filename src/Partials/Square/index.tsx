import React, { useMemo } from 'react'

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
  const activeClassName = useMemo<string>(() => {
    return `${props.active ? ' active' : ''}`
  }, [props.active])

  return (
    <div className={activeClassName} data-testid="square" tabIndex={0}
      onClick={() => props.onClick()} onKeyDown={(e) => handleKeyDown(e)}>
      {props.value}
    </div>
  )
}
