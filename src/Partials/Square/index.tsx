import React, { useMemo } from 'react'

interface SquareProps {
  value: string
  active: boolean
  onClick: () => void
}

export function Square(props: SquareProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      props.onClick()
    }
  }
  const activeClassName = useMemo<string>(() => {
    return props.active ? 'bg-stone-300 active' : ''
  }, [props.active])

  const divStyle = 'border border-stone-400'

  return (
    <div
      className={`w-12 h-12 flex justify-center items-center ${divStyle} ${activeClassName}`}
      data-testid="square"
      tabIndex={0}
      onClick={() => props.onClick()}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <div className="text-xl">{props.value}</div>
    </div>
  )
}
