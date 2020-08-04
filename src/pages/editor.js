import React from 'react'
import cn from 'classnames'
import styles from './editor.module.sass'
import { compose } from "redux"
import { PROP_TYPES } from "constants/common"
import Row from "components/Row"
import Category from "components/Category"

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


const getPropKeyName = (id) => `p${id}`
const getCategoryKeyName = (id) => `c${id}`
const getRowKeyName = (id) => `r${id}`









const normalizeValuesByCategoriesProps = (categories) => (products) =>
   products.map(product => {
     const categoryKey = getCategoryKeyName(product.cid)

     const category = categories.byKey[categoryKey]
     console.log(category)
     const categoryProps = category.properties.values

     const values = categoryProps.reduce((res, { id, type }, i) => {
       return {
         ...res,
         [getPropKeyName(id)]: product.values[i]
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

  return {
    byKey,
    get values() {
      return Object.values(this.byKey)
    },
    get keys() {
      return Object.keys(this.byKey)
    }
  }
}


const normalizeProperties = (categories) =>
   categories.map(category => ({
     ...category,
     properties: normalize(getPropKeyName)(category.properties)
   }))


const initialValuesEditor = {
  products: [],
  properties: [],
  categories: []
}

const Editor = ({ data = initialValuesEditor }) => {
  function renderCategoryProps(categoryProps, allProps) {
    return (
       <tr>
         {categoryProps.keys.map(key => {
           const { id, title } = allProps.byKey[key]
           return (
              <th key={id}>{title}</th>
           )
         })}
       </tr>
    )
  }

  function renderRowsByCategoryId(categoryId, rows) {
    return rows.values
       .filter(({ cid }) => cid === categoryId)
       .map(row => (
          <Row key={row.id} {...row}/>
       ))
  }

  const properties = normalize(getPropKeyName)(data.properties)

  const categories = compose(
     normalize(getCategoryKeyName),
     normalizeProperties
  )(data.categories)

  const rows = compose(
     normalize(getRowKeyName)
     // normalizeValuesByCategoriesProps(categories)
  )(data.rows)


  // console.log('properties', properties, properties.keys, properties.values)
  // console.log('categories', categories, categories.keys, categories.values)
  // console.log(
  //    'categories properties',
  //    categories.values[0].properties,
  //    categories.values[0].properties.keys,
  //    categories.values[0].properties.values
  // )
  // console.log('rows', rows, rows.keys, rows.values)


  return (
     <div className={styles.catalog}>
       {categories.values.map(category => (
          <div key={category.id} className={styles.block}>
            <Category {...category}/>
            <table className={styles.products}>
              <tbody>
              {renderCategoryProps(category.properties, properties)}
              {/*{renderRowsByCategoryId(category.id, rows)}*/}
              </tbody>
            </table>
            <div className={styles.btn}>+ Добавить</div>
          </div>
       ))}
     </div>
  )
}

export default Editor