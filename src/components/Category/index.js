import React, { useContext } from "react"
import cn from 'classnames'
import ColumnHeaders from "components/ColumnHeaders"
import Row from "components/Row"
import { ColumnsContext } from "components/ColumnsContext"
import { HandlersContext } from "components/HandersContext"
import CategoryTitle from "components/CategoryTitle"
import Btn from "components/Btn"
import styles from 'components/Editor/editor.module.sass'


const Category = ({
                    title = '',
                    path = '',
                    id,
                    pid,
                    idx,
                    visibleMoveUp = true,
                    visibleMoveDown = true,
                    rows = []
                  }) => {
  const handlers = useContext(HandlersContext)
  const columns = useContext(ColumnsContext)

  const addRowButton =
     <Btn
        title="+ Товар"
        onClick={handlers.onAddRow(id)}
     />


  const addChildCategoryButton =
     <Btn
        title="+ Подкатегория"
        onClick={handlers.onAddChildCategory(id)}
     />


  const deleteCategoryButton =
     <Btn
        title="Удалить"
        onClick={handlers.onCategoryDelete(id)}
     />


  return (
     <div
        key={id}
        className={cn(styles.block, rows.length && styles.mb)}
     >
       <div className={styles.category}>
         <CategoryTitle
            categoryId={id}
            categoryParentId={pid}
            title={title}
            path={path}
            onChange={handlers.onChangeCategory}
         />
         <div className={styles.btns}>
           {!rows.length && <>
             {addRowButton}
             {' | '}
             {addChildCategoryButton}
             {' | '}
           </>}
           {deleteCategoryButton}
           {' | '}
           <Btn
              title="Вверх"
              onClick={handlers.onCategoryMoveUp(idx)}
              className={cn(!visibleMoveUp && styles.empty)}
           />
           {' | '}
           <Btn
              title="Вниз"
              onClick={handlers.onCategoryMoveDown(idx)}
              className={cn(!visibleMoveDown && styles.empty)}
           />
         </div>
       </div>

       {rows.length > 0 && (
          <>
            <table className={styles.products}>
              <tbody>
              <ColumnHeaders/>
              {rows.map((row, idx) => {
                const id = row[columns.idKey]
                return (
                   <Row
                      key={idx}
                      id={id}
                      onRowMoveDown={handlers.onRowMoveDown(id)}
                      onRowMoveUp={handlers.onRowMoveUp(id)}
                      onRowRemove={handlers.onRowRemove(id)}
                      upVisible={idx > 0}
                      downVisible={idx < rows.length - 1}
                      values={row}
                   />
                )
              })}
              <tr>
                <td colSpan={999} className={styles.btns}>
                  {addRowButton}
                  {' | '}
                  {addChildCategoryButton}
                </td>
              </tr>
              </tbody>
            </table>
          </>
       )}
     </div>
  )
}

export default React.memo(Category)