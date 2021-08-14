import React from 'react'
import './style.scss'

interface SquareProps {
  value: number
}

interface SquareState {
  value: string
}

export class Square extends React.Component<SquareProps, SquareState> {
  constructor (props: SquareProps | Readonly<SquareProps>) {
    super(props)

    this.state = {
      value: ''
    }
  }

  render () {
    return (
      <button className="square" data-testid="square"
        onClick={() => { this.setState({ value: 'X' }) }}>
        {this.state.value}
      </button>
    )
  }
}
