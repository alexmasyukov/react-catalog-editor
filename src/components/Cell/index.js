import React, { useEffect, useReducer } from 'react'
import cn from 'classnames'
import DynamicControl from "components/DynamicControl"
import styles from './../../pages/editor.module.sass'
import { PROP_TYPES } from "constants/common"

const TYPES = {
  EDIT_START: 'EDIT_START',
  EDIT_COMPLETE: 'EDIT_COMPLETE'
}

const initialState = {
  isEdit: false,
  value: undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.EDIT_COMPLETE:
      return {
        ...state,
        isEdit: false,
        value: action.value
      }

    case TYPES.EDIT_START:
      return {
        ...state,
        isEdit: true
      }

    default:
      return state
  }
}


const Cell = ({ property, colKey, value: initialValue }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    value: initialValue
  })

  useEffect(() => {
    dispatch({
      type: TYPES.EDIT_COMPLETE,
      value: initialValue
    })
  }, [initialValue])

  const { style, default: defaultValue } = property

  const handleCellClick = () => {
    dispatch({
      type: TYPES.EDIT_START
    })
  }

  const handleCellEnter = (value) => {
    dispatch({
      type: TYPES.EDIT_COMPLETE,
      value
    })
  }

  const handleToggleCheck = ({ target }) => {
    // const value = propType === PROP_TYPES.CHECK ? target.checked : target.value
    dispatch({
      type: TYPES.EDIT_COMPLETE,
      value: target.checked
    })
  }

  const handlers = {}
  if (property.type !== PROP_TYPES.CHECK && property.type !== PROP_TYPES.LABEL) {
    handlers.onClick = handleCellClick
  }

  return (
     <td
        key={colKey}
        style={style}
        className={cn(state.isEdit && styles.editCell)}
        {...handlers}
     >
       <DynamicControl
          colKey={colKey}
          isEdit={state.isEdit}
          value={state.value === undefined ? defaultValue : state.value}
          property={property}
          onToggleCheck={handleToggleCheck}
          onEnter={handleCellEnter}
       />
     </td>
  )
}


export default Cell