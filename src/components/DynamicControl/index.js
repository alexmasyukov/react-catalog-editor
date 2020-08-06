import React, { useContext, useState } from 'react'
import { PROP_TYPES } from "constants/common"
import { EditContext } from "components/EditContext"
import styles from './dynamiccontrol.module.sass'


const Edit = ({
                initialValue, number = false, onEnter = {}, style = {}
              }) => {
  const [value, setValue] = useState(initialValue)

  return (
     <input
        autoFocus={true}
        className={styles.edit}
        type={number ? 'number' : 'text'}
        onChange={({ target: { value } }) => setValue(value)}
        onKeyPress={({ target: { value }, key }) =>
           key === 'Enter' ? onEnter(value) : false
        }
        onBlur={({ target: { value } }) => onEnter(value)}
        value={value}
        style={style}
     />
  )
}


const Textarea = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue)
  return (
     <textarea
        autoFocus={true}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
     />
  )
}


const DynamicControl = ({ rowKey, colKey, isEdit = {}, value, property, onChange, onEnter }) => {
  const editContext = useContext(EditContext)
  const { edit = false, height = 0, width = 0 } = isEdit
  const style = { height, width }

  switch (property.type) {
    case PROP_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onChange(colKey, property.type)}/>
      )

    case PROP_TYPES.STRING:
      if (edit) {
        return <Edit
           initialValue={value}
           onEnter={onEnter}
           style={style}
        />
      }
      return value

    case PROP_TYPES.NUMBER:
      if (edit) {
        return <Edit
           initialValue={value}
           number={true}
           onEnter={onEnter}
           style={style}
        />
      }
      return value

    case PROP_TYPES.TEXT:
      if (edit) {
        return <Textarea
           initialValue={value}
           onEnter={onEnter}
           style={style}
        />
      }
      return value

    default:
      return value
  }
}

export default React.memo(DynamicControl)