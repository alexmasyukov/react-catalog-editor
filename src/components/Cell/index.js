import React, { useState } from 'react'
import cn from 'classnames'
import styles from './../../pages/editor.module.sass'

import DynamicControl from "components/DynamicControl"

const isEditInitial = { isEdit: false, width: 0, heigth: 0 }

const Cell = ({ property, rowKey, colKey, value, onChange }) => {
  const [isEdit, setIsEdit] = useState(isEditInitial)
  const { style, default: defaultValue } = property

  const handleCellClick = (e) => {
    setIsEdit({
      edit: true,
      width: e.target.offsetWidth
    })
  }

  const handleCellEnter = () => setIsEdit({
    ...isEditInitial,
    isEdit: false
  })

  return (
     <td
        key={colKey}
        style={style}
        className={cn(isEdit.edit && styles.editCell)}
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