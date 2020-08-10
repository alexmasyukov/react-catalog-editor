import { ACTION_TYPES } from "store/actionTypes"
import {
  withNewChildCategory,
  withNewRow,
  withUpdatedCategory
} from "store/childReducers"
import { itemMove } from "helpers"

const reducer = (state, action) => {
  const idKey = state.columns.idKey

  switch (action.type) {
    case ACTION_TYPES.ADD_ROW:
      return {
        ...state,
        rows: withNewRow(action.cid, state)
      }

    case ACTION_TYPES.ADD_CHILD_CATEGORY:
      return {
        ...state,
        categories: withNewChildCategory(action.id, state)
      }

    case ACTION_TYPES.DELETE_ROW:
      return {
        ...state,
        rows: state.rows.filter(row => row[idKey] !== action.id)
      }

    case ACTION_TYPES.CHANGE_CELL:
      return {
        ...state,
        rows: state.rows.map(row =>
           row[idKey] === action.rowId ?
              {
                ...row,
                [action.colKey]: action.value
              } : row
        )
      }

    case ACTION_TYPES.CHANGE_CATEGORY:
      return {
        ...state,
        categories: withUpdatedCategory(action.category, state)
      }

    case ACTION_TYPES.MOVE_UP_CATEGORY:
      return {
        ...state,
        categories: itemMove(state.categories, action.idx, action.idx - 1)
      }


    case ACTION_TYPES.MOVE_DOWN_CATEGORY:
      return {
        ...state,
        categories: itemMove(state.categories, action.idx, action.idx + 1)
      }


    default:
      return state
  }
}

export default reducer