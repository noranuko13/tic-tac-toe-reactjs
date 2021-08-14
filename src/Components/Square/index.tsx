import React from 'react'
import './style.scss'

interface SquareProps {
  value: string
  onClick: any
}

export class Square extends React.Component<SquareProps, {}> {
  render () {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.props.onClick()
      }
    }

    return (
      <div className="contrast outline square" data-testid="square" tabIndex={0}
        onClick={() => this.props.onClick()} onKeyPress={(e) => handleKeyPress(e)}>
        {this.props.value}
      </div>
    )
  }
}
