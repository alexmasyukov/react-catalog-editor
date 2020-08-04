import React, { useContext } from "react"
import { PropertiesContext } from "components/PropertiesContext"
import styles from "pages/editor.module.sass"

const Category = ({ title = '' }) => {
  const properties = useContext(PropertiesContext)
  // console.log(properties.values)
  console.log('Category', 'properties', properties)
  return (
     <div className={styles.category}>
       <div className={styles.title}>{title}</div>
       <div className={styles.btns}>
         <div className={styles.btn}>Вверх</div>
         <div className={styles.btn}>Вниз</div>
       </div>
     </div>
  )
}

export default Category