import React from 'react'
import cn from 'classnames'
import styles from './editor.module.sass'
import { compose } from "redux"
import { PROP_TYPES } from "constants/common"

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


const Control = ({ propId, value, property }) => {
  switch (property.type) {
    case PROP_TYPES.CHECK:
      return <input
         name="isGoing"
         type="checkbox"
         checked={value}
         onChange={() => {
         }}/>

    default:
      return value
  }
}

const Product = ({ id, cid, values, properties }) => {
  return (
     <tr>
       {Object.entries(values).map(([propId, value]) => {
         const property = properties[propId]
         const { style } = property

         return (
            <td
               key={propId}
               style={style}
            >
              <Control propId={propId} value={value} property={property}/>
            </td>
         )
       })
       }
     </tr>
  )
}


const Category = ({ title = '' }) => {
  return (
     <div className={styles.title}>{title}</div>
  )
}


const setValuesKeysByCategoriesProperties = (categories) => (products) =>
   products.map(product => {
     const categoryId = getPropKeyName(product.cid)
     const category = categories[categoryId]
     const categoryProps = Object.values(category.properties)

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


const normalize = (array, getKeyName = (id) => getPropKeyName(id)) =>
   array.reduce((res, item) => {
     return {
       ...res,
       [getKeyName(item.id)]: item
     }
   }, {})


const normalizeProperties = (categories) =>
   categories.map(category => ({
     ...category,
     properties: normalize(category.properties, getPropKeyName)
   }))


const initialValuesEditor = {
  products: [],
  properties: [],
  categories: []
}

const Editor = ({ data = initialValuesEditor }) => {
  const properties = normalize(data.properties, getPropKeyName)

  const categories = compose(
     normalize,
     normalizeProperties
  )(data.categories)

  const products = compose(
     normalize,
     setValuesKeysByCategoriesProperties(categories)
  )(data.products)

  // console.log(properties)
  // console.log(categories)
  // console.log(products)

  return (
     <div className={styles.catalog}>
       {Object.values(categories).map(category => (
          <div key={category.id} className={styles.category}>
            <Category {...category}/>
            <table className={styles.products}>
              <tbody>
              <tr>
                {Object.keys(category.properties).map(id => (
                   <th key={id}>{properties[id].title}</th>
                ))}
              </tr>
              {Object.values(products)
                 .filter(({ cid }) => cid === category.id)
                 .map(item => (
                    <Product key={item.id} {...item} properties={properties}/>
                 ))}
              </tbody>
            </table>
          </div>
       ))}
     </div>
  )
}

export default Editor