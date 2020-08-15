import React, { useEffect, useReducer } from 'react'
import Category from "components/Category"
import Btn from "components/Btn"
import { ColumnsProvider } from "components/ColumnsContext"
import { HandlersProvider } from "components/HandersContext"
import { CategoriesProvider } from "components/CategoriesContext"
import { COLUMN_TYPES } from "constants/common"
import { ACTION_TYPES } from "store/actionTypes"
import reducer from "store/reducer"
import {
  assignWithEmptyShema,
  getColumnKeyName,
  setCategoriesPaths
} from "helpers"
import styles from 'components/Editor/editor.module.sass'


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


const setDefaultValues = (rows, columns) => {
  return rows.map(row =>
     columns.keys.reduce((preparedRow, colKey) => {
       const value = row[colKey]
       const column = columns.byKey[colKey]
       const columnDefaulValue = 'default' in column ? column.default : undefined

       return {
         ...preparedRow,
         [colKey]: value ? value : columnDefaulValue
       }
     }, {})
  )
}


const getKeyByColumnType = (columnType, columns) =>
   columns.keys.filter(key => columns.byKey[key].type === columnType)


const initialConfig = {
  idCounter: () => 0,
  cidCounter: () => 0,
  getImage: (img) => img,
  uploadImageUrl: ''
}


const initialState = {
  columns: [],
  categories: [],
  rows: []
}


const prepareData = (data) => {
  // const columns = normalize(getColumnKeyName)(data.columns)
  // columns.idKey = getKeyByColumnType(COLUMN_TYPES.ID, columns)
  // columns.cidKey = getKeyByColumnType(COLUMN_TYPES.CATEGORY_ID, columns)
// rows: setDefaultValues(
  //    normalizeRowValuesByKeys(data.rows, columns.keys), columns
  // )

  return {
    ...data,
    categories: setCategoriesPaths(data.categories)
  }
}


const Editor = ({ data, config = initialConfig, onChange }) => {
  const [state, dispatch] = useReducer(reducer, prepareData({ ...initialState, ...data }))
  const { columns, rows, categories } = state
  onChange(state)

  console.warn('Editor render', state)


  const handleAddRow = (cid) => () =>
     dispatch({
       type: ACTION_TYPES.ADD_ROW,
       cid,
       id: config.idCounter()
     })


  const handleRowMoveDown = (id) => () => {
    const idx = state.rows.findIndex(row => row.id === id)
    if (idx === 0) return false

    dispatch({
      type: ACTION_TYPES.MOVE_DOWN_ROW,
      idx
    })
  }


  const handleRowMoveUp = (id) => () => {
    const idx = state.rows.findIndex(row => row.id === id)
    if (idx === 0) return false

    dispatch({
      type: ACTION_TYPES.MOVE_UP_ROW,
      idx
    })
  }


  const handleRowRemove = (id) => () => {
    const question = window.confirm('Удалить товар?')
    if (question) {
      dispatch({
        type: ACTION_TYPES.DELETE_ROW,
        id
      })
    }
  }


  const handleCellChange = (rowId, colKey, columnType) => ({ target }) => {
    console.log('handleCellChange', rowId, colKey, columnType)
    const value = columnType === COLUMN_TYPES.CHECK ? target.checked : target.value
    dispatch({
      type: ACTION_TYPES.CHANGE_CELL,
      rowId,
      colKey,
      value
    })
  }


  const handleAddChildCategory = (pid) => () =>
     dispatch({
       type: ACTION_TYPES.ADD_CHILD_CATEGORY,
       id: config.cidCounter(),
       pid
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
    const question = window.confirm('Удалить категорию?')
    if (question) {
      const questionRows = window.confirm('Все товары категории тоже ' +
         'будет удалены. Продолжить?')
      if (questionRows) {
        dispatch({
          type: ACTION_TYPES.DELETE_CATEGORY,
          id
        })
      }
    }
  }

  const handleAddCategory = () =>
     dispatch({
       type: ACTION_TYPES.ADD_CATEGORY,
       id: config.cidCounter()
     })


  const handleImageMoveLeft = (rowId, colKey, imageIdx) => () => {
    if (imageIdx > 0) {
      dispatch({
        type: ACTION_TYPES.MOVE_IMAGE,
        rowId,
        colKey,
        imageIdx
      })
    }
  }

  const onAddImage = (rowId, colKey) => (image) => {
    dispatch({
      type: ACTION_TYPES.ADD_IMAGE,
      rowId,
      colKey,
      image
    })
  }


  const getRowsByCategoryId = (cid) =>
     rows.filter(row => row.cid === cid)


  return (
     <div className={styles.catalog}>
       <CategoriesProvider value={categories}>
         <ColumnsProvider value={columns}>
           <HandlersProvider value={{
             onChangeCell: handleCellChange,
             onRowMoveDown: handleRowMoveDown,
             onRowMoveUp: handleRowMoveUp,
             onRowRemove: handleRowRemove,
             onAddRow: handleAddRow,
             onCategoryMoveDown: handleCategoryMoveDown,
             onCategoryMoveUp: handleCategoryMoveUp,
             onCategoryDelete: handleCategoryDelete,
             onAddChildCategory: handleAddChildCategory,
             onChangeCategory: handleChangeCategory,
             onImageMoveLeft: handleImageMoveLeft,
             onAddImage: onAddImage,
             config
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
             <Btn
                title="+ Добавить категорию"
                className={styles.btnNewCategory}
                onClick={handleAddCategory}
             />
           </HandlersProvider>
         </ColumnsProvider>
       </CategoriesProvider>
     </div>
  )
}

export default Editor