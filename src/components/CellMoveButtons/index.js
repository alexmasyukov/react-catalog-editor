import React from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import CellDeleteButton from "components/CellDeleteButton"
import styles from 'pages/editor.module.sass'
import cn from "classnames"

const CellMoveButtons = ({
                           upVisible = true,
                           downVisible = true,
                           onRowMoveUp,
                           onRowMoveDown,
                           onRowRemove
                         }) => {
  return (
     <div className={styles.cellButtons}>
       <AiOutlineArrowUp
          onClick={onRowMoveUp}
          className={cn(!upVisible && styles.empty)}
       />
       <AiOutlineArrowDown
          onClick={onRowMoveDown}
          className={cn(!downVisible && styles.empty)}
       />
       <CellDeleteButton onRowRemove={onRowRemove}/>
     </div>
  )
}

export default CellMoveButtons