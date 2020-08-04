import React, { useContext } from 'react'
import { PropertiesContext } from "components/PropertiesContext"
import DynamicControl from "components/DynamicControl"

const Row = ({ id, cid, values }) => {
  const properties = useContext(PropertiesContext)

  return (
     <tr>
       {Object.entries(values).map(([propKey, value]) => {
         const property = properties.byKey[propKey]
         const { style } = property

         return (
            <td key={propKey} style={style}>
              <DynamicControl propKey={propKey} value={value} property={property}/>
            </td>
         )
       })}
     </tr>
  )
}

export default Row