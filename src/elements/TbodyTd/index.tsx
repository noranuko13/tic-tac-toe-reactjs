import React, { ReactElement } from 'react'
import classNames from 'classnames'

interface TbodyTdProps {
  'data-testid': string
  children: React.ReactNode
}

export function TbodyTd(props: TbodyTdProps): ReactElement {
  return (
    <td
      data-testid={props['data-testid']}
      className={classNames('px-3 py-2 text-center')}
    >
      {props.children}
    </td>
  )
}
