import { useState } from 'react'
import { OrderType } from '../../constants'
import { RecordList } from '../../models'
import { Sheet } from '../../partials'

interface MoveProps {
  recordList: RecordList
  stepNumber: number
  jumpTo: any
}

export function Move(props: MoveProps) {
  const [orderType, setOrderType] = useState<OrderType>('asc')

  const sortRecords = () => {
    setOrderType(orderType === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div data-testid="move">
      <Sheet
        {...props}
        sortRecords={() => sortRecords()}
        orderType={orderType}
      />
    </div>
  )
}
