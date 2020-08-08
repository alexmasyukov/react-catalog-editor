import React  from 'react'
import { INPUT_TYPES, PROP_TYPES } from "constants/common"
import Edit from "components/Edit"


const DynamicControl = ({ rowId, colKey, isEdit = false, value, property, onChange }) => {
  switch (property.type) {
    case PROP_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onChange(rowId, colKey, property.type)}/>
      )

    case PROP_TYPES.STRING:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, colKey, property.type)}
        />
      }
      return value

    case PROP_TYPES.NUMBER:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, colKey, property.type)}
           number={true}
        />
      }
      return value

    case PROP_TYPES.TEXT:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, colKey, property.type)}
           inputType={INPUT_TYPES.TEXTAREA}
        />
      }
      return value

    default:
      return value
  }
}

export default DynamicControl