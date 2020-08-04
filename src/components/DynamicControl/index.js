import React from 'react'
import { PROP_TYPES } from "constants/common"

const DynamicControl = ({ propId, value, property }) => {
  switch (property.type) {
    case PROP_TYPES.CHECK:
      return <input
         name="isGoing"
         type="checkbox"
         checked={value}
         onChange={() => {
         }}/>

    default:
      return value
  }
}

export default DynamicControl