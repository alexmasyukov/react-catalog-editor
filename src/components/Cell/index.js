import React, { useContext, useEffect, useReducer, useState } from 'react'
import cn from 'classnames'
import DynamicControl from "components/DynamicControl"
import { COLUMN_TYPES } from "constants/common"
import { HandlersContext } from "components/HandersContext"
import styles from './../../pages/editor.module.sass'

const TYPES = {
  EDIT: 'EDIT',
  EDIT_COMPLETE: 'EDIT_COMPLETE'
}

const initialState = {
  isEdit: false
}


const Cell = ({ column, colKey, rowId, value }) => {
  const [isEdit, setIsEdit] = useState(false)
  const handlers = useContext(HandlersContext)
  const { style } = column

  useEffect(() => {
    setIsEdit(false)
  }, [value])

  const handleCellClick = () => {
    setIsEdit(true)
  }

  const handleCellChange = (...args) => (e) => {
    setIsEdit(false)
    handlers.onChangeCell(...args)(e)
  }


  const cellHandlers = {}
  if (column.type !== COLUMN_TYPES.CHECK && column.type !== COLUMN_TYPES.LABEL) {
    cellHandlers.onClick = handleCellClick
  }

  return (
     <td
        key={colKey}
        style={style}
        className={cn(isEdit && styles.editCell)}
        {...cellHandlers}
     >
       <DynamicControl
          rowId={rowId}
          colKey={colKey}
          isEdit={isEdit}
          value={value}
          column={column}
          onChange={handleCellChange}
       />
     </td>
  )
}


export default React.memo(Cell)