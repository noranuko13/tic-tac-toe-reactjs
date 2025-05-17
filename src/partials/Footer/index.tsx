import classNames from 'classnames'

export function Footer() {
  return (
    <footer
      data-testid="footer"
      className={classNames(
        'text-right text-sm',
        'border-t-4 border-double border-stone-400',
      )}
    >
      <a
        href="https://github.com/noranuko13/tic-tac-toe-reactjs"
        target="_blank"
        rel="noreferrer"
        className={classNames('pr-1', 'text-stone-600')}
      >
        noranuko13/tic-tac-toe-reactjs | GitHub
      </a>
    </footer>
  )
}
