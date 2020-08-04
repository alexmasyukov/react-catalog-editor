import React, { useState, useContext } from "react"
import cn from 'classnames'
import Properties from "components/Properties"
import Row from "components/Row"
import styles from "pages/editor.module.sass"
import { assignWithEmptyShema, getPropKeyName, getRowKeyName } from "helpers"
import { PropertiesContext } from "components/PropertiesContext"

const AddRowButton = ({ onClick }) => (
   <div className={styles.btn} onClick={onClick}>+ Добавить товар</div>
)

const Category = ({ title = '', id, rows: initialRows }) => {
  const [rows, setRows] = useState(initialRows)
  const properties = useContext(PropertiesContext)
  console.log('rows', rows, id)

  const handleClickAddProduct = () => {
    const lastIndex = rows.values.length
    const values = properties.values.reduce((res, prop) => ({
      ...res,
      [getPropKeyName(prop.id)]: prop.default
    }), {})
    const newRow = {
      id: id + lastIndex,
      cid: id,
      values
    }

    console.log(rows, newRow, rows.values.length, getRowKeyName(newRow.id))

    const newRows = assignWithEmptyShema({
      ...rows.byKey,
      [getRowKeyName(newRow.id)]: newRow
    })
    // setRows(rowsUpdate)

    console.log(newRows)

    setRows(newRows)
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