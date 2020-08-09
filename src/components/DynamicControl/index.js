import React  from 'react'
import { INPUT_TYPES, COLUMN_TYPES } from "constants/common"
import Edit from "components/Edit"


const DynamicControl = ({ rowId, colKey, isEdit = false, value, column, onChange }) => {
  switch (column.type) {
    case COLUMN_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onChange(rowId, colKey, column.type)}/>
      )

    case COLUMN_TYPES.STRING:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, colKey, column.type)}
        />
      }
      return value

    case COLUMN_TYPES.NUMBER:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, colKey, column.type)}
           number={true}
        />
      }
      return value

    case COLUMN_TYPES.TEXT:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, colKey, column.type)}
           inputType={INPUT_TYPES.TEXTAREA}
        />
      }
      return value

    default:
      return value
  }
}

export default React.memo(DynamicControl)