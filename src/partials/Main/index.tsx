import React from 'react'
import './style.scss'

interface MainProps {
  status: React.ReactNode
  board: React.ReactNode
  move: React.ReactNode
}

export function Main(props: MainProps) {
  return (
    <main data-testid="main" className="main">
      <article className="left">
        {props.status}
        {props.board}
      </article>
      <article className="right">{props.move}</article>
    </main>
  )
}
