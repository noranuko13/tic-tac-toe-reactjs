import React from 'react'
import './style.scss'

interface SquareProps {
  value: string
  onClick: any
}

export class Square extends React.Component<SquareProps, {}> {
  render () {
    return (
      <button className="square" data-testid="square"
        onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}
