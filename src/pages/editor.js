import React from 'react'
import Category from "components/Category"
import { PropertiesProvider } from "components/PropertiesContext"
import {
  addToKey,
  assignWithEmptyShema,
  compose,
  getCategoryKeyName,
  getPropKeyName
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


const initialValuesEditor = {
  products: [],
  properties: [],
  categories: []
}

const Editor = ({ data = initialValuesEditor }) => {
  const properties = normalize(getPropKeyName)(data.properties)
  // addToKey('keyId', getKeyByPropType(PROP_TYPES.ID)),
  // addToKey('keyCid', getKeyByPropType(PROP_TYPES.CATEGORY_ID)),
  const categories = normalize(getCategoryKeyName)(data.categories)
  const rows = data.rows.map(row => normalizeValuesByKeys(properties.keys, row))

  const propertiesIdKey = getKeyByPropType(PROP_TYPES.ID, properties)
  const propertiesCidKey = getKeyByPropType(PROP_TYPES.CATEGORY_ID, properties)

  const getRowsByCategoryId = (cid) =>
     rows.filter(row => row[propertiesCidKey] === cid)

  return (
     <div className={styles.catalog}>
       <PropertiesProvider value={properties}>
         {categories.values.map(category => (
            <Category
               key={category.id}
               rows={getRowsByCategoryId(category.id)}
               {...category}
            />
         ))}
       </PropertiesProvider>
     </div>
  )
}

export default Editor