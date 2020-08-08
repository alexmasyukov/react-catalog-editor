import React, { useContext, useEffect, useReducer, useState } from 'react'
import cn from 'classnames'
import DynamicControl from "components/DynamicControl"
import { PROP_TYPES } from "constants/common"
import { HandlersContext } from "components/HandersContext"
import styles from './../../pages/editor.module.sass'

const TYPES = {
  EDIT: 'EDIT',
  EDIT_COMPLETE: 'EDIT_COMPLETE'
}

const initialState = {
  isEdit: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.EDIT_COMPLETE:
      return {
        ...state,
        isEdit: false
      }

    case TYPES.EDIT:
      return {
        ...state,
        isEdit: true
      }

    default:
      return state
  }
}


const Cell = ({ property, colKey, rowId, value }) => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [isEdit, setIsEdit] = useState(false)
  const handlers = useContext(HandlersContext)
  const { style } = property

  useEffect(() => {
    setIsEdit(false)
  //   dispatch({
  //     type: TYPES.EDIT_COMPLETE
  //   })
  }, [value])

  const handleCellClick = () => {
    setIsEdit(true)
    // dispatch({
    //   type: TYPES.EDIT
    // })
  }


  const cellHandlers = {}
  if (property.type !== PROP_TYPES.CHECK && property.type !== PROP_TYPES.LABEL) {
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
          property={property}
          onChange={handlers.onChangeCell}
       />
     </td>
  )
}


export default React.memo(Cell)