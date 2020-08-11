import React, { useContext } from 'react'
import { ColumnsContext } from "components/ColumnsContext"
import Cell from "components/Cell"
import CellMoveButtons from "components/CellMoveButtons"

const Row = ({
               id,
               values,
               onRowMoveDown,
               onRowMoveUp,
               onRowRemove,
               upVisible,
               downVisible
             }) => {
  const columns = useContext(ColumnsContext)

  return (
     <tr>
       {Object.keys(values).map((colKey) => {
         const column = columns.byKey[colKey]
         const value = values[colKey]

         if (column.hidden) return null

         return (
            <Cell
               key={id + colKey}
               column={column}
               rowId={id}
               colKey={colKey}
               value={value}
            />
         )
       })}
       <td>
         <CellMoveButtons
            upVisible={upVisible}
            downVisible={downVisible}
            onRowMoveDown={onRowMoveDown}
            onRowMoveUp={onRowMoveUp}
            onRowRemove={onRowRemove}
         />
       </td>
     </tr>
  )
}

export default React.memo(Row)