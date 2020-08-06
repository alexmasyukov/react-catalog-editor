import React, { useState } from 'react'
import cn from 'classnames'
import styles from './../../pages/editor.module.sass'

import DynamicControl from "components/DynamicControl"


const Cell = ({ property, rowKey, colKey, value, onChange }) => {
  const [isEdit, setIsEdit] = useState(false)
  const { style, default: defaultValue } = property

  const handleCellClick = (e) => {
    setIsEdit(true)
  }

  const handleCellEnter = () => setIsEdit(false)

  return (
     <td
        key={colKey}
        style={style}
        className={cn(isEdit && styles.editCell)}
        onClick={handleCellClick}
     >
       <DynamicControl
          colKey={colKey}
          rowKey={rowKey}
          isEdit={isEdit}
          value={value === undefined ? defaultValue : value}
          property={property}
          onChange={onChange}
          onEnter={handleCellEnter}
       />
     </td>
  )
}


export default Cell