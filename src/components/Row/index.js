import React, { useContext, useState } from 'react'
import { PropertiesContext } from "components/PropertiesContext"
import Cell from "components/Cell"
import CellMoveButtons from "components/CellMoveButtons"

const Row = ({
               idx,
               rowCount,
               values,
               onRowMoveDown,
               onRowMoveUp,
               onRowRemove
             }) => {
  const properties = useContext(PropertiesContext)

  return (
     <tr>
       {Object.keys(values).map((colKey, idx) => {
         const property = properties.byKey[colKey]
         const value = values[colKey]

         if (property.hidden) return null

         return (
            <Cell
               key={idx + colKey}
               property={property}
               colKey={colKey}
               value={value}
            />
         )
       })}
       <td>
         <CellMoveButtons
            upVisible={idx > 0}
            downVisible={idx < rowCount}
            onRowMoveDown={onRowMoveDown(idx)}
            onRowMoveUp={onRowMoveUp(idx)}
            onRowRemove={onRowRemove(idx)}
         />
       </td>
     </tr>
  )
}

export default Row