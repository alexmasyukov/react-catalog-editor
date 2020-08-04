import React, { useState } from "react"
import cn from 'classnames'
import Properties from "components/Properties"
import Row from "components/Row"
import styles from "pages/editor.module.sass"
import { getRowKeyName } from "helpers"

const AddRowButton = ({ onClick }) => (
   <div className={styles.btn} onClick={onClick}>+ Добавить товар</div>
)

const Category = ({ title = '', id, rows: initialRows }) => {
  const [rows, setRows] = useState(initialRows)

  const handleClickAddProduct = () => {
    const lastIndex = rows.values.length
    const emptyRow = {}

    setRows({
      ...rows,
      byId: {
        ...rows.byId,
        [getRowKeyName(lastIndex)]: emptyRow
      }
    })
  }

  return (
     <div
        key={id}
        className={cn(styles.block, rows.values.length && styles.mb)}
     >
       <div className={styles.category}>
         <div className={styles.title}>{title}</div>
         <div className={styles.btns}>
           {!rows.values.length && (
              <AddRowButton onClick={handleClickAddProduct}/>
           )}
           <div className={styles.btn}>Вверх</div>
           <div className={styles.btn}>Вниз</div>
         </div>
       </div>
       {rows.values.length > 0 && (
          <>
            <table className={styles.products}>
              <tbody>
              <Properties/>
              {Object.entries(rows.byKey).map(([key, value]) => (
                 <Row key={key} rowKey={key} {...value}/>
              ))}
              </tbody>
            </table>
            <AddRowButton onClick={handleClickAddProduct}/>
          </>
       )}
     </div>
  )
}

export default Category