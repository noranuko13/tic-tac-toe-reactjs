import React, { ReactElement } from 'react'

interface ButtonProps {
  'data-testid': string
  children: React.ReactNode
  onClick: () => void
}

export function Button(props: ButtonProps): ReactElement {
  const buttonShape: string = 'py-1 w-12 rounded font-bold'
  const buttonStyle: string = 'bg-stone-500 hover:bg-stone-400'
  return (
    <button
      data-testid={props['data-testid']}
      onClick={() => props.onClick()}
      className={`${buttonShape} ${buttonStyle}`}
    >
      {props.children}
    </button>
  )
}
