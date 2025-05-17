import classNames from 'classnames'

interface SquareProps {
  value: string
  active: boolean
  moveForward: () => void
}

export function Square(props: SquareProps) {
  return (
    <button
      data-testid="square"
      onClick={() => props.moveForward()}
      className={classNames('h-12 w-12', 'border border-stone-400', {
        'active bg-stone-300': props.active,
      })}
    >
      {props.value}
    </button>
  )
}
