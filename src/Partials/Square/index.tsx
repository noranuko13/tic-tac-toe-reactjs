import React, { useMemo } from 'react'
import { Tailwind } from './tailwind'

interface SquareProps {
  value: string
  active: boolean
  onClick: () => void
}

export function Square(props: SquareProps) {
  const className = useMemo<string>(() => {
    return [
      Tailwind.className({ active: props.active }),
      props.active ? 'active' : '',
    ].join(' ')
  }, [props.active])

  return (
    <button
      data-testid="square"
      onClick={() => props.onClick()}
      className={className}
    >
      {props.value}
    </button>
  )
}
