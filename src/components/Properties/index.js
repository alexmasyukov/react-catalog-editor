import React, { useContext } from 'react'
import { PropertiesContext } from "components/PropertiesContext"

const Properties = () => {
  const properties = useContext(PropertiesContext)

  return (
     <tr>
       {properties.values.map(({ id, title }) => {
         return (
            <th key={id}>{title}</th>
         )
       })}
     </tr>
  )
}

export default Properties