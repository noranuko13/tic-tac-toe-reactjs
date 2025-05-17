import React, { ReactElement } from 'react'
import classNames from 'classnames'

interface TheadThProps {
  children: React.ReactNode
}

export function TheadTh(props: TheadThProps): ReactElement {
  return (
    <th
      scope="col"
      data-testid="thead-th"
      className={classNames('px-3 py-2', 'bg-stone-300')}
    >
      {props.children}
    </th>
  )
}
