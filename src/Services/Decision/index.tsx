import { LINES } from '../../constants'

const indexOfWinner = (squares: string[]): number => {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return i
    }
  }

  return -1
}

export const calculateWinner = (squares: string[]): string => {
  const index = indexOfWinner(squares)
  if (index !== -1) {
    return squares[LINES[index][0]]
  }
  return ''
}

export const calculateLine = (squares: string[]): ReadonlyArray<number> => {
  const index = indexOfWinner(squares)
  if (index !== -1) {
    return LINES[index]
  }
  return []
}
