import React, { useState } from 'react'
import Category from "components/Category"
import { ColumnsProvider } from "components/ColumnsContext"
import { HandlersProvider } from "components/HandersContext"
import { CategoriesProvider } from "components/CategoriesContext"
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


  const handleChangeCategory = (updateCategory) => {
    console.log('handleChangeCategory', updateCategory)

    const updateCategories = categories.map(category =>
       category.id === updateCategory.id ? {
         ...category,
         ...updateCategory
       } : category
    )

    setCategories(setCategoriesPaths(updateCategories))
  }

  const handleCategoryMoveDown = (idx) => () => {
    // const findIndex = categories.findIndex(({id: requiredId}) => requiredId === id)
    if (idx === categories.length - 1) return false

    setCategories(itemMove(categories, idx, idx + 1))
  }

  const handleCategoryMoveUp = (idx) => () => {
    // const findIndex = categories.findIndex(({id: requiredId}) => requiredId === id)
    if (idx === 0) return false

    setCategories(itemMove(categories, idx, idx - 1))
  }

  const handleCategoryDelete = (id) => () => {

  }


  return (
     <div className={styles.catalog}>
       <CategoriesProvider value={categories}>
         <ColumnsProvider value={columns}>
           <HandlersProvider value={{
             onChangeCell: handleCellOnChange,
             onRowMoveDown: handleRowMoveDown,
             onRowMoveUp: handleRowMoveUp,
             onRowRemove: handleRowRemove,
             onCategoryMoveDown: handleCategoryMoveDown,
             onCategoryMoveUp: handleCategoryMoveUp,
             onCategoryDelete: handleCategoryDelete,
             onClickAddProduct: handleClickAddProduct,
             onClickAddChildCategory: handleClickAddChildCategory,
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