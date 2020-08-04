import React from 'react'
// import cn from 'classnames'
import styles from './editor.module.sass'
// import { compose } from "redux"
import Category from "components/Category"
import { PropertiesProvider } from "components/PropertiesContext"
import { assignWithEmptyShema, getCategoryKeyName, getPropKeyName, getRowKeyName } from "helpers"
// import Rows from "components/Rows"

// const sortByOrder = (a, b) => {
//   if (!('order' in a) || !('order' in b)) return 0
//   return a.order > b.order ? 1 : -1
// }
//
// const sortByDefineOrder = (a) => 'order' in a ? -1 : 1

// ...getPropertyById(id, fromProperties),
// ...other
// const getPropertyById = (id, props) => {
//   const result = props.filter(prop => prop.id === id)
//   return result.length ? result[0] : {}
// }


// const getPropertiesByIds = (ids, fromProperties) =>
//    ids.reduce((res, { id, ...other }) => {
//      const propName = getPropKeyName(id)
//      return {
//        ...res,
//        [propName]: {
//          ...fromProperties[propName],
//          ...other
//        }
//      }
//    }, {})
//

// const normalizeProperties = (categories) =>
//    categories.map(category => ({
//      ...category,
//      properties: normalize(getPropKeyName)(category.properties)
//    }))


// console.log('properties', properties, properties.keys, properties.values)
// console.log('categories', categories, categories.keys, categories.values)
// console.log(
//    'categories properties',
//    categories.values[0].properties,
//    categories.values[0].properties.keys,
//    categories.values[0].properties.values
// )
// console.log('rows', rows, rows.keys, rows.values)




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

  // console.log(Object.assign(emptyRow, {byKey}))

  // return Object.assign(emptyRow, {byKey})
  return assignWithEmptyShema(byKey)
    // byKey,
    // values: emptyRow.values,
    // get keys() {
    //   return Object.keys(this.byKey)
    // }
  // }
}


const initialValuesEditor = {
  products: [],
  properties: [],
  categories: []
}


const Editor = ({ data = initialValuesEditor }) => {
  const properties = normalize(getPropKeyName)(data.properties)
  const categories = normalize(getCategoryKeyName)(data.categories)
  const rows = normalizeValuesByProperties(properties)(data.rows)

  const getRowsByCategoryId = (cid) => {
    const categoryRows = rows.filter(row => row.cid === cid)
    return normalize(getRowKeyName)(categoryRows)
  }

  return (
     <PropertiesProvider value={properties}>
       <div className={styles.catalog}>
         {categories.values.map(category => (
            <Category
               key={category.id}
               rows={getRowsByCategoryId(category.id)}
               {...category}
            />
         ))}
       </div>
     </PropertiesProvider>
  )
}

export default Editor