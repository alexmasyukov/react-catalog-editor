import React, { useContext } from "react"
import cn from 'classnames'
import ColumnHeaders from "components/ColumnHeaders"
import Row from "components/Row"
import { ColumnsContext } from "components/ColumnsContext"
import styles from "pages/editor.module.sass"
import { HandlersContext } from "components/HandersContext"


const AddRowButton = ({ onClick }) => (
   <div className={styles.btn} onClick={onClick}>+ Добавить товар</div>
)

const Category = ({
                    title = '',
                    id,
                    rows = []
                  }) => {
  const handlers = useContext(HandlersContext)
  const columns = useContext(ColumnsContext)

  return (
     <div
        key={id}
        className={cn(styles.block, rows.length && styles.mb)}
     >
       <div className={styles.category}>
         <div className={styles.title}>{title}</div>
         <div className={styles.btns}>
           {!rows.length && (
              <AddRowButton onClick={handlers.onClickAddProduct(id)}/>
           )}
           <div className={styles.btn}>Вверх</div>
           <div className={styles.btn}>Вниз</div>
         </div>
       </div>

       {rows.length > 0 && (
          <>
            <table className={styles.products}>
              <tbody>
              <ColumnHeaders/>
              {rows.map((row, idx) => (
                 <Row
                    key={idx}
                    id={row[columns.idKey]}
                    onRowMoveDown={handlers.onRowMoveDown(idx)}
                    onRowMoveUp={handlers.onRowMoveUp(idx)}
                    onRowRemove={handlers.onRowRemove(idx)}
                    upVisible={idx > 0}
                    downVisible={idx < rows.length - 1}
                    values={row}
                 />
              ))}
              </tbody>
            </table>
            <AddRowButton onClick={handlers.onClickAddProduct(id)}/>
          </>
       )}
     </div>
  )
}

export default Category