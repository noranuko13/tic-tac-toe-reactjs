import React, { ReactElement } from 'react'
import './style.scss'

interface ButtonProps {
  'data-testid': string
  children: React.ReactNode
  onClick: () => void
}

export function Button(props: ButtonProps): ReactElement {
  return (
    <button
      data-testid={props['data-testid']}
      onClick={() => props.onClick()}
      className="button"
    >
      {props.children}
    </button>
  )
}
