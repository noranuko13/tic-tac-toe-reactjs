import React from 'react'
import './style.scss'

interface SquareProps {
  value: string
  active: boolean
  onClick: any
}

export class Square extends React.Component<SquareProps, {}> {
  render () {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.props.onClick()
      }
    }
    const className = `contrast outline square${this.props.active ? ' active' : ''}`

    return (
      <div className={className} data-testid="square" tabIndex={0}
        onClick={() => this.props.onClick()} onKeyPress={(e) => handleKeyPress(e)}>
        {this.props.value}
      </div>
    )
  }
}
