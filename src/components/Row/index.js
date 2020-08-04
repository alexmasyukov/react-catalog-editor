import React, { useContext, useState } from 'react'
import { PropertiesContext } from "components/PropertiesContext"
import DynamicControl from "components/DynamicControl"
import { PROP_TYPES } from "constants/common"

const Row = ({ id, values, rowKey }) => {
  const [row, setRow] = useState(values)
  const properties = useContext(PropertiesContext)

  const handleChange = (rowKey, colKey, propType) => (event) => {
    const target = event.target
    const value = propType === PROP_TYPES.CHECK ? target.checked : target.value

    console.log(rowKey, colKey, propType, value)

    setRow({
      ...row,
      [colKey]: value
    })
  }


  return (
     <tr>
       {Object.entries(row).map(([colKey, value]) => {
         const property = properties.byKey[colKey]
         const { style } = property

         return (
            <td key={colKey} style={style}>
              <DynamicControl
                 rowKey={rowKey}
                 colKey={colKey}
                 value={value === undefined ? property.default : value}
                 property={property}
                 onChange={handleChange}
              />
            </td>
         )
       })}
     </tr>
  )
}

export default Row