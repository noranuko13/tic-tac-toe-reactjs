import React from 'react'
import './style.scss'

interface WrapperProps {
  children: React.ReactNode
}

export function Wrapper(props: WrapperProps) {
  return (
    <div data-testid="wrapper" className="wrapper">
      <div>{props.children}</div>
    </div>
  )
}
