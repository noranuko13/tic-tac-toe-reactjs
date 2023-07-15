import React from 'react'
import './style.scss'

interface MainProps {
  board: React.ReactNode
  status: React.ReactNode
  console: React.ReactNode
  move: React.ReactNode
}

export function Main(props: MainProps) {
  return (
    <main data-testid="main" className="main">
      <article className="left">
        {props.board}
        {props.status}
        {props.console}
      </article>
      <article className="right">{props.move}</article>
    </main>
  )
}
