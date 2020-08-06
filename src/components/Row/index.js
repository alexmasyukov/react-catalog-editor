import React, { useContext } from 'react'
import { PropertiesContext } from "components/PropertiesContext"
import Cell from "components/Cell"

const Row = ({ rowKey, values }) => {
  const properties = useContext(PropertiesContext)

  return (
     <tr>
       {Object.entries(values).map(([colKey, value]) => {
         const property = properties.byKey[colKey]
         return (
            <Cell
               key={rowKey + colKey}
               value={value}
               property={property}
               rowKey={rowKey}
               colKey={colKey}
            />
         )
       })}
     </tr>
  )
}

export default Row