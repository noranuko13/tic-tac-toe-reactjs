import React, { ReactElement } from 'react'
import classNames from 'classnames'

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
      className={classNames(
        'w-full rounded-sm px-4 py-1 font-bold',
        'bg-lime-700 bg-opacity-50 text-stone-700',
        'hover:bg-lime-500 hover:bg-opacity-50 hover:text-stone-600',
      )}
    >
      {props.children}
    </button>
  )
}
