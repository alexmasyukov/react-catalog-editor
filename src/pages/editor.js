import React from 'react'
import styles from './editor.module.sass'
import { compose } from "redux"
import { PROP_TYPES } from "constants/common"

const sortByOrder = (a, b) => {
  if (!('order' in a) || !('order' in b)) return 0
  return a.order > b.order ? 1 : -1
}

const sortByDefineOrder = (a) => 'order' in a ? -1 : 1


const getPropertyById = (id, props) => {
  const result = props.filter(prop => prop.id === id)
  return result.length ? result[0] : {}
}

const getPropertiesByIds = (ids, fromProperties) =>
   ids.map(({ id, ...other }) => ({
     ...getPropertyById(id, fromProperties),
     ...other
   }))

const Control = ({ type = PROP_TYPES.STRING }) => {
  switch (type) {
    case PROP_TYPES.ID:
      return 'sdfsf'

    default:
      return 'def'
  }
}

const Product = ({ id, cid, values }) => {
  console.log(id, cid, values)
  return (
     <tr>
       {Object.entries(values).map(([key, value]) => (
          <td key={key}>
            {value}
            {/*<Control type={key} value={value} />*/}
          </td>
       ))}
     </tr>
  )
}


const Category = ({ title = '', is = {} }) => {
  return (
     <>
       <div className={styles.title}>{title}</div>
     </>
  )
}


const prepareCategories = (allProperties) => (categories) =>
   categories.map(category => {
     const properties = getPropertiesByIds(category.properties, allProperties)
        .sort(sortByDefineOrder)
        .sort(sortByOrder)

     return {
       ...category,
       properties
     }
   })


const normalize = (array) => {
  return array.reduce((res, item) => {
    return {
      ...res,
      [item.id]: item
    }
  }, {})

  // return {
  //   byId,
  //   allIds: Object.keys(byId)
  // }
}

const initialValuesEditor = {
  products: [],
  properties: [],
  categories: []
}

const Editor = ({ data = initialValuesEditor }) => {
  const categories = compose(
     normalize,
     prepareCategories(data.properties)
  )(data.categories)

  const products = normalize(data.products)
  console.log(products)
  // const properties = normalize(data.properties)

  // data.map(item => prepare(item, allProperties))

  return (
     <div className={styles.catalog}>
       {Object.values(categories).map(category => (
          <div key={category.id} className={styles.category}>
            <Category {...category}/>
            <table className={styles.products}>
              <tbody>
              <tr>
                {category.properties.map(({ id, title = '' }) => (
                   <th key={id}>{title}</th>
                ))}
              </tr>
              {Object.values(products)
                 .filter(({ cid }) => cid === category.id)
                 .map(item => (
                    <Product key={item.id} {...item} />
                 ))}
              </tbody>
            </table>
          </div>
       ))}
     </div>
  )
}

export default Editor