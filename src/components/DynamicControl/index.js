import React from 'react'
import { PROP_TYPES } from "constants/common"

const DynamicControl = ({ rowKey, colKey, value, property, onChange }) => {
  switch (property.type) {
    case PROP_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onChange(rowKey, colKey, property.type)}/>
      )

    default:
      return value
  }
}

export default DynamicControl