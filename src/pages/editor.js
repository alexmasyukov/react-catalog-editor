import React, { useState } from 'react'
import Category from "components/Category"
import { ColumnsProvider } from "components/ColumnsContext"
import { HandlersProvider } from "components/HandersContext"
import {
  assignWithEmptyShema,
  getCategoryPath,
  getColumnDefaultValue,
  getColumnKeyName,
  itemMove
} from "helpers"
import styles from './editor.module.sass'
import { COLUMN_TYPES } from "constants/common"


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

const normalizeValuesByKeys = (keys, values) =>
   keys.reduce((res, key, i) => ({
     ...res,
     [key]: values[i]
   }), {})


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


const initialData = {
  helpers: {
    categoryIdMaker: () => 0,
    rowIdMaker: () => 0
  },
  columns: [],
  categories: [],
  rows: []
}

const setCategoriesPaths = (categories) => {
  const getPath = (id) => getCategoryPath(id, categories)

  return categories.map(category => ({
    ...category,
    path: getPath(category.id)
  }))
}


const Editor = ({ data = initialData, onChange }) => {
  const [columns, setColumns] = useState(
     normalize(getColumnKeyName)(data.columns)
  )
  const [categories, setCategories] = useState(
     setCategoriesPaths(data.categories)
  )
  const [rows, setRows] = useState(
     data.rows.map(row => normalizeValuesByKeys(columns.keys, row))
  )
  const { helpers } = data

  // todo: БЛЯТЬ !!! Мутация, двойной рендер!!!!
  columns.idKey = getKeyByColumnType(COLUMN_TYPES.ID, columns)
  columns.cidKey = getKeyByColumnType(COLUMN_TYPES.CATEGORY_ID, columns)
  console.warn('Editor render')

  const getRowsByCategoryId = (cid) =>
     rows.filter(row => row[columns.cidKey] === cid)

  const handleClickAddProduct = (cid) => () => {
    console.log('handleClickAddProduct', cid)
    const newRow = columns.keys.reduce((res, key) => {
      const column = columns.byKey[key]
      let defaultValue = ''

      switch (column.type) {
        case COLUMN_TYPES.ID:
          defaultValue = helpers.rowIdMaker()
          break

        case COLUMN_TYPES.CATEGORY_ID:
          defaultValue = cid
          break

        default:
          defaultValue = getColumnDefaultValue(column.default)
      }

      return {
        ...res,
        [key]: defaultValue
      }
    }, {})

    setRows([...rows, newRow])
  }

  const handleRowMoveDown = (idx) => () => {
    console.log('handleRowMoveDown', idx)

    const update = itemMove(rows, idx, idx + 1)
    setRows(update)
  }

  const handleRowMoveUp = (idx) => () => {
    console.log('handleRowMoveUp', idx)

    const update = itemMove(rows, idx, idx - 1)
    setRows(update)
  }

  const handleRowRemove = (idx) => () => {
    console.log('handleRowRemove', idx)

    const question = window.confirm('Удалить?')
    if (question)
      setRows(rows.filter((row, currentIdx) => currentIdx !== idx))
  }

  const handleCellOnChange = (rowId, colKey, columnType) => ({ target }) => {
    const value = columnType === COLUMN_TYPES.CHECK ? target.checked : target.value
    console.log('handleCellOnChange', rowId, colKey, value)

    const update = rows.map(row => {
      const id = row[columns.idKey]
      if (id !== rowId) return row

      return {
        ...row,
        [colKey]: value
      }
    })

    setRows(update)
  }

  const handleClickAddChildCategory = (id) => () => {
    console.log('handleClickAddChildCategory', id)
    const newCategory = {
      id: helpers.categoryIdMaker(),
      pid: id,
      title: 'Новая'
    }

    const idx = categories.findIndex(category => category.id === id)
    const updatedCategories = [
      ...categories.slice(0, idx + 1),
      newCategory,
      ...categories.slice(idx + 1)
    ]

    setCategories(setCategoriesPaths(updatedCategories))
  }


  return (
     <div className={styles.catalog}>
       <ColumnsProvider value={columns}>
         <HandlersProvider value={{
           onChangeCell: handleCellOnChange,
           onRowMoveDown: handleRowMoveDown,
           onRowMoveUp: handleRowMoveUp,
           onRowRemove: handleRowRemove,
           onClickAddProduct: handleClickAddProduct,
           onClickAddChildCategory: handleClickAddChildCategory
         }}>
           {categories.map(category => (
              <Category
                 key={category.id}
                 rows={getRowsByCategoryId(category.id)}
                 {...category}
              />
           ))}
         </HandlersProvider>
       </ColumnsProvider>
     </div>
  )
}

export default Editor