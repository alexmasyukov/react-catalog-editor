import React from 'react'
import { INPUT_TYPES, PROP_TYPES } from "constants/common"
import Edit from "components/Edit"


const DynamicControl = ({ colKey, isEdit = false, value, property, onToggleCheck, onEnter }) => {
  switch (property.type) {
    case PROP_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onToggleCheck}/>
      )

    case PROP_TYPES.STRING:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onEnter}
        />
      }
      return value

    case PROP_TYPES.NUMBER:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onEnter}
           number={true}
        />
      }
      return value

    case PROP_TYPES.TEXT:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onEnter}
           inputType={INPUT_TYPES.TEXTAREA}
        />
      }
      return value

    default:
      return value
  }
}

export default DynamicControl