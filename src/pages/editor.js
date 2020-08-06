import React, { useState } from 'react'
import Category from "components/Category"
import { PropertiesProvider } from "components/PropertiesContext"
import { EditProvider } from "components/EditContext"
import {
  assignWithEmptyShema,
  getCategoryKeyName,
  getPropKeyName,
  getRowKeyName
} from "helpers"
import styles from './editor.module.sass'


const normalizeValuesByProperties = (properties) => (products) =>
   products.map(product => {
     const values = properties.keys.reduce((res, key, i) => {
       return {
         ...res,
         [key]: product.values[i]
       }
     }, {})

     return {
       ...product,
       values
     }
   })


const normalize = (getKeyName = (id) => getPropKeyName(id)) => (array) => {
  const byKey = array.reduce((res, item) => {
    return {
      ...res,
      [getKeyName(item.id)]: item
    }
  }, {})
  return assignWithEmptyShema(byKey)
}


const initialValuesEditor = {
  products: [],
  properties: [],
  categories: []
}


const Editor = ({ data = initialValuesEditor }) => {
  const [editCell, setEditCell] = useState(false)

  const properties = normalize(getPropKeyName)(data.properties)
  const categories = normalize(getCategoryKeyName)(data.categories)
  const rows = normalizeValuesByProperties(properties)(data.rows)

  const getRowsByCategoryId = (cid) => {
    const categoryRows = rows.filter(row => row.cid === cid)
    return normalize(getRowKeyName)(categoryRows)
  }

  const handleCellClick = (rowKey, colKey) => (e) => {
    console.log('click on', rowKey, colKey)
    setEditCell({
      rowKey,
      colKey
    })
  }

  return (
     <div className={styles.catalog}>
       <PropertiesProvider value={properties}>
         <EditProvider value={{
           editCell
         }}>
           {categories.values.map(category => (
              <Category
                 key={category.id}
                 rows={getRowsByCategoryId(category.id)}
                 handleCellClick={handleCellClick}
                 {...category}
              />
           ))}
         </EditProvider>
       </PropertiesProvider>
     </div>
  )
}

export default Editor