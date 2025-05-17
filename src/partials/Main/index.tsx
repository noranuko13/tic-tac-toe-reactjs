import React from 'react'
import classNames from 'classnames'

interface MainProps {
  board: React.ReactNode
  status: React.ReactNode
  console: React.ReactNode
  move: React.ReactNode
}

export function Main(props: MainProps) {
  return (
    <main
      data-testid="main"
      className={classNames('flex flex-col gap-6 pb-4 sm:flex-row')}
    >
      <article className={classNames('flex flex-col gap-3 sm:w-2/5')}>
        {props.board}
        {props.status}
        {props.console}
      </article>
      <article className={classNames('sm:w-3/5')}>{props.move}</article>
    </main>
  )
}
