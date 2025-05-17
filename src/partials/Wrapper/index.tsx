import React from 'react'
import classNames from 'classnames'

interface WrapperProps {
  children: React.ReactNode
}

export function Wrapper(props: WrapperProps) {
  return (
    <div
      data-testid="wrapper"
      className={classNames('h-screen', 'bg-stone-200 text-stone-950')}
    >
      <div className={classNames('container mx-auto max-w-xl py-5')}>
        {props.children}
      </div>
    </div>
  )
}
