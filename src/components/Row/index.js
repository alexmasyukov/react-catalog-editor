import React, { useContext, useState } from 'react'
import { PropertiesContext } from "components/PropertiesContext"
import { PROP_TYPES } from "constants/common"
import Cell from "components/Cell"

const Row = ({ rowKey, values, handleCellClick }) => {
  const [row, setRow] = useState(values)
  const properties = useContext(PropertiesContext)

  const handleChange = (colKey, propType) => (event) => {
    const target = event.target
    const value = propType === PROP_TYPES.CHECK ? target.checked : target.value

    setRow({
      ...row,
      [colKey]: value
    })
  }

  return (
     <tr>
       {Object.entries(row).map(([colKey, value]) => {
         const property = properties.byKey[colKey]

         return (
            <Cell
               key={rowKey + colKey}
               value={value}
               property={property}
               rowKey={rowKey}
               colKey={colKey}
               onCellClick={handleCellClick}
               onChange={handleChange}
            />
         )
       })}
     </tr>
  )
}

export default React.memo(Row)