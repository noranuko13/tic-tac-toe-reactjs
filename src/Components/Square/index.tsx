import React from 'react'
import './style.scss'

interface SquareProps {
  value: number
}

export class Square extends React.Component<SquareProps, {}> {
  render () {
    return (
      <button className="square" data-testid="square">
        {this.props.value}
      </button>
    )
  }
}
