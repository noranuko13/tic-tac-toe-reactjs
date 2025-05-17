import React, { ReactElement } from 'react'
import classNames from 'classnames'

interface TbodyThProps {
  children: React.ReactNode
}

export function TbodyTh(props: TbodyThProps): ReactElement {
  return (
    <th
      scope="row"
      data-testid="tbody-th"
      className={classNames('px-3 py-2 text-center')}
    >
      {props.children}
    </th>
  )
}
