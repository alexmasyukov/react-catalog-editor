import React, { useState, useContext, useEffect } from "react"
import cn from 'classnames'
import Properties from "components/Properties"
import Row from "components/Row"
import {
  assignWithEmptyShema,
  getPropKeyName,
  getRowKeyName,
  itemMove
} from "helpers"
import { PropertiesContext } from "components/PropertiesContext"
import styles from "pages/editor.module.sass"


const AddRowButton = ({ onClick }) => (
   <div className={styles.btn} onClick={onClick}>+ Добавить товар</div>
)

const Category = ({ title = '', id, rows: initialRows }) => {
  const [rows, setRows] = useState(initialRows.values)
  const properties = useContext(PropertiesContext)

  const handleClickAddProduct = () => {
    const lastIndex = rows.length
    const values = properties.values.reduce((res, prop) => ({
      ...res,
      [getPropKeyName(prop.id)]: prop.default
    }), {})
    const newId = id + lastIndex
    const newRow = {
      id: newId,
      cid: id,
      values: {
        ...values,
        [getPropKeyName(1)]: newId
      }
    }

    const newRows = assignWithEmptyShema({
      ...rows.byKey,
      [getRowKeyName(newRow.id)]: newRow
    })

    setRows(newRows)
  }


  useEffect(() => {
    console.log('rows', rows)
  }, [rows])

  const handleRowMoveDown = (idx) => () => {
    const update = itemMove(rows, idx, idx + 1)
    setRows(update)
  }

  const handleRowMoveUp = (idx) => () => {
    const update = itemMove(rows, idx, idx - 1)
    setRows(update)
  }

  const handleRowRemove = (idx) => () => {

  }

  return (
     <div
        key={id}
        className={cn(styles.block, rows.length && styles.mb)}
     >
       <div className={styles.category}>
         <div className={styles.title}>{title}</div>
         <div className={styles.btns}>
           {!rows.length && (
              <AddRowButton onClick={handleClickAddProduct}/>
           )}
           <div className={styles.btn}>Вверх</div>
           <div className={styles.btn}>Вниз</div>
         </div>
       </div>

       {rows.length > 0 && (
          <>
            <table className={styles.products}>
              <tbody>
              <Properties/>
              {rows.map((row, idx) => (
                 <Row
                    key={idx}
                    idx={idx}
                    rowCount={rows.length - 1}
                    onRowMoveDown={handleRowMoveDown}
                    onRowMoveUp={handleRowMoveUp}
                    onRowRemove={handleRowRemove}
                    {...row}
                 />
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