import { LINES } from '../../constants'

export const calculateWinner = (squares: string[]): string => {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return ''
}

export const calculateLine = (squares: string[]): ReadonlyArray<number> => {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return LINES[i]
    }
  }

  return []
}
