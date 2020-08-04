import React from "react"
import styles from "pages/editor.module.sass"

const Category = ({ title = '' }) => {
  // console.log(properties.values)
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