import React, { useReducer, useState } from 'react'
import Category from "components/Category"
import { ColumnsProvider } from "components/ColumnsContext"
import { HandlersProvider } from "components/HandersContext"
import { CategoriesProvider } from "components/CategoriesContext"
import {
  assignWithEmptyShema,
  getCategoryPath,
  getColumnDefaultValue,
  getColumnKeyName,
  itemMove, setCategoriesPaths
} from "helpers"
import styles from './editor.module.sass'
import { COLUMN_TYPES } from "constants/common"
import reducer from "store/reducer"
import { ACTION_TYPES } from "store/actionTypes"


// const normalizeValuesByProperties = (properties) => (products) =>
//    products.map(product => {
//      const values = properties.keys.reduce((res, key, i) => {
//        return {
//          ...res,
//          [key]: product.values[i]
//        }
//      }, {})
//
//      return {
//        ...product,
//        values
//      }
//    })

const normalizeRowValuesByKeys = (rows, keys) => {
  return rows.map(row =>
     keys.reduce((res, key, i) => ({
       ...res,
       [key]: row[i]
     }), {})
  )
}


const normalize = (getKeyName = (id) => getColumnKeyName(id)) => (array) => {
  const byKey = array.reduce((res, item) => {
    return {
      ...res,
      [getKeyName(item.id)]: item
    }
  }, {})
  return assignWithEmptyShema(byKey)
}

const getKeyByColumnType = (columnType, columns) =>
   columns.keys.filter(key => columns.byKey[key].type === columnType)


const initialState = {
  helpers: {
    categoryIdMaker: () => 0,
    rowIdMaker: () => 0
  },
  columns: [],
  categories: [],
  rows: []
}


const prepareData = (data) => {
  const columns = normalize(getColumnKeyName)(data.columns)
  columns.idKey = getKeyByColumnType(COLUMN_TYPES.ID, columns)
  columns.cidKey = getKeyByColumnType(COLUMN_TYPES.CATEGORY_ID, columns)

  return {
    ...data,
    columns,
    categories: setCategoriesPaths(data.categories),
    rows: normalizeRowValuesByKeys(data.rows, columns.keys)
  }
}


const Editor = ({ data = initialState, onChange }) => {
  const [state, dispatch] = useReducer(reducer, prepareData(data))
  const { columns, rows, categories, helpers } = state

  console.warn('Editor render')


  const handleAddRow = (cid) => () =>
     dispatch({
       type: ACTION_TYPES.ADD_ROW,
       cid
     })


  const handleRowMoveDown = (cid, id) => () => {
    console.log('handleRowMoveDown', id)

    const idx = rows.findIndex(row => row[columns.idKey] === id)
    if (idx === rows.length - 1) return false
    // setRows(itemMove(rows, idx, idx + 1))
  }


  const handleRowMoveUp = (id) => () => {
    console.log('handleRowMoveUp', id)

    const idx = rows.findIndex(row => row[columns.idKey] === id)
    console.log('idx', idx, rows)
    if (idx === 0) return false
    // setRows(itemMove(rows, idx, idx - 1))
  }


  const handleRowRemove = (id) => () => {
    const question = window.confirm('Удалить?')
    if (question) {
      dispatch({
        type: ACTION_TYPES.DELETE_ROW,
        id
      })
    }
  }


  const handleCellOnChange = (rowId, colKey, columnType) => ({ target }) => {
    const value = columnType === COLUMN_TYPES.CHECK ? target.checked : target.value
    dispatch({
      type: ACTION_TYPES.CHANGE_CELL,
      rowId,
      colKey,
      value
    })
  }


  const handleAddChildCategory = (id) => () =>
     dispatch({
       type: ACTION_TYPES.ADD_CHILD_CATEGORY,
       id
     })


  const handleChangeCategory = (category) =>
     dispatch({
       type: ACTION_TYPES.CHANGE_CATEGORY,
       category
     })


  const handleCategoryMoveDown = (idx) => () => {
    if (idx === categories.length - 1) return false

    dispatch({
      type: ACTION_TYPES.MOVE_DOWN_CATEGORY,
      idx
    })
  }

  const handleCategoryMoveUp = (idx) => () => {
    if (idx === 0) return false

    dispatch({
      type: ACTION_TYPES.MOVE_UP_CATEGORY,
      idx
    })
  }


  const handleCategoryDelete = (id) => () => {

  }


  const getRowsByCategoryId = (cid) =>
     rows.filter(row => row[columns.cidKey] === cid)

  return (
     <div className={styles.catalog}>
       <CategoriesProvider value={categories}>
         <ColumnsProvider value={columns}>
           <HandlersProvider value={{
             onChangeCell: handleCellOnChange,
             onRowMoveDown: handleRowMoveDown,
             onRowMoveUp: handleRowMoveUp,
             onRowRemove: handleRowRemove,
             onAddRow: handleAddRow,
             onCategoryMoveDown: handleCategoryMoveDown,
             onCategoryMoveUp: handleCategoryMoveUp,
             onCategoryDelete: handleCategoryDelete,
             onAddChildCategory: handleAddChildCategory,
             onChangeCategory: handleChangeCategory
           }}>
             {categories.map((category, idx) => (
                <Category
                   key={category.id}
                   idx={idx}
                   visibleMoveUp={idx > 0}
                   visibleMoveDown={idx < categories.length - 1}
                   rows={getRowsByCategoryId(category.id)}
                   {...category}
                />
             ))}
           </HandlersProvider>
         </ColumnsProvider>
       </CategoriesProvider>
     </div>
  )
}

export default Editor