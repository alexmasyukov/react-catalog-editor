import React, { useContext } from "react"
import cn from 'classnames'
import ColumnHeaders from "components/ColumnHeaders"
import Row from "components/Row"
import { ColumnsContext } from "components/ColumnsContext"
import styles from "pages/editor.module.sass"
import { HandlersContext } from "components/HandersContext"


const AddButton = ({ onClick, text = '' }) => (
   <div className={styles.btn} onClick={onClick}>{text}</div>
)

const Category = ({
                    title = '',
                    id,
                    rows = []
                  }) => {
  const handlers = useContext(HandlersContext)
  const columns = useContext(ColumnsContext)

  const addRowButton = (
     <AddButton
        text="+ Добавить товар"
        onClick={handlers.onClickAddProduct(id)}
     />
  )

  const addChildCategoryButton = (
     <AddButton
        text="+ Добавить подкатегорию"
        onClick={handlers.onClickAddChildCategory(id)}
     />
  )

  return (
     <div
        key={id}
        className={cn(styles.block, rows.length && styles.mb)}
     >
       <div className={styles.category}>
         <div className={styles.title}>{title}</div>
         <div className={styles.btns}>
           {!rows.length && (
              <>
                {addRowButton}
                {addChildCategoryButton}
              </>
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
            {addChildCategoryButton}
            {addRowButton}
          </>
       )}
     </div>
  )
}

export default React.memo(Category)