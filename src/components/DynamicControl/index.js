import React, { useContext, useState } from 'react'
import { PROP_TYPES } from "constants/common"
import { EditContext } from "components/EditContext"
import styles from './dynamiccontrol.module.sass'

const INPUT_TYPES = {
  TEXTAREA: 'TEXTAREA',
  INPUT: 'INPUT'
}

const Edit = ({
                initialValue,
                inputType = INPUT_TYPES.INPUT,
                number = false,
                onEnter = {}
              }) => {
  const [value, setValue] = useState(initialValue)

  switch (inputType) {
    case INPUT_TYPES.TEXTAREA:
      return (
         <textarea
            autoFocus={true}
            rows={1}
            defaultValue={value}
            onChange={({ target: { value } }) => setValue(value)}
            onKeyPress={({ target: { value }, key }) =>
               key === 'Enter' ? onEnter(value) : false
            }
            onBlur={({ target: { value } }) => onEnter(value)}
         />
      )

    case INPUT_TYPES.INPUT:
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
         />
      )
  }
}


const DynamicControl = ({ rowKey, colKey, isEdit = false, value, property, onChange, onEnter }) => {
  const editContext = useContext(EditContext)

  switch (property.type) {
    case PROP_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onChange(colKey, property.type)}/>
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