import React, { useContext, useState } from 'react'
import { PropertiesContext } from "components/PropertiesContext"
import Cell from "components/Cell"
import CellMoveButtons from "components/CellMoveButtons"
import CellDeleteButton from "components/CellDeleteButton"

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
       <td>
         <CellMoveButtons
            upVisible={idx > 0}
            downVisible={idx < rowCount}
            onRowMoveDown={onRowMoveDown(idx)}
            onRowMoveUp={onRowMoveUp(idx)}
         />
       </td>
       {Object.keys(values).map((colKey, idx) => {
         const property = properties.byKey[colKey]
         const value = values[colKey]

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
         <CellDeleteButton onRowRemove={onRowRemove}/>
       </td>
     </tr>
  )
}

export default Row