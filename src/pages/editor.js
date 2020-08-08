import React, { useState } from 'react'
import Category from "components/Category"
import { ColumnsProvider } from "components/ColumnsContext"
import { HandlersProvider } from "components/HandersContext"
import {
  assignWithEmptyShema,
  getCategoryKeyName, getPropDefaultValue,
  getPropKeyName, itemMove
} from "helpers"
import styles from './editor.module.sass'
import { PROP_TYPES } from "constants/common"


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


const normalize = (getKeyName = (id) => getPropKeyName(id)) => (array) => {
  const byKey = array.reduce((res, item) => {
    return {
      ...res,
      [getKeyName(item.id)]: item
    }
  }, {})
  return assignWithEmptyShema(byKey)
}

const getKeyByPropType = (propType, properties) =>
   properties.keys.filter(key => properties.byKey[key].type === propType)


const initialData = {
  products: [],
  columns: [],
  categories: []
}

const Editor = ({ data = initialData, onChange }) => {
  const [columns, setColumns] = useState(normalize(getPropKeyName)(data.columns))
  const [categories, setCategories] = useState(normalize(getCategoryKeyName)(data.categories))
  const [rows, setRows] = useState(
     data.rows.map(row => normalizeValuesByKeys(columns.keys, row))
  )

  columns.idKey =  getKeyByPropType(PROP_TYPES.ID, columns)
  columns.cidKey = getKeyByPropType(PROP_TYPES.CATEGORY_ID, columns)

  const getRowsByCategoryId = (cid) =>
     rows.filter(row => row[columns.cidKey] === cid)

  const handleClickAddProduct = (cid) => () => {
    console.log('handleClickAddProduct', cid)
    const newRow = columns.keys.reduce((res, key) => {
      const prop = columns.byKey[key]
      const defaultValue = getPropDefaultValue(prop.default, cid)

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

  const handleCellOnChange = (rowId, colKey, propType) => ({ target }) => {
    const value = propType === PROP_TYPES.CHECK ? target.checked : target.value

    console.log('handleCellOnChange', rowId, colKey, value)
    const update = rows.map(row => {
      const id = row[columns.idKey]
      if (id !== rowId) return row

      return {
        ...row,
        [colKey]: value
      }
    })

    // console.log(update)
    setRows(update)
  }


  return (
     <div className={styles.catalog}>
       <ColumnsProvider value={columns}>
         <HandlersProvider value={{
           onChangeCell: handleCellOnChange,
           onRowMoveDown: handleRowMoveDown,
           onRowMoveUp: handleRowMoveUp,
           onRowRemove: handleRowRemove,
           onClickAddProduct: handleClickAddProduct
         }}>
           {categories.values.map(category => (
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