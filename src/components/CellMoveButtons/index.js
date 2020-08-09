import React from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import CellDeleteButton from "components/CellDeleteButton"
import styles from 'pages/editor.module.sass'

const CellMoveButtons = ({
                           upVisible = true,
                           downVisible = true,
                           onRowMoveUp,
                           onRowMoveDown,
                           onRowRemove
                         }) => {
  return (
     <div className={styles.cellButtons}>
       {upVisible ? (
          <AiOutlineArrowUp onClick={onRowMoveUp}/>
       ) : (
          <AiOutlineArrowUp className={styles.empty}/>
       )}
       {downVisible ? (
          <AiOutlineArrowDown onClick={onRowMoveDown}/>
       ) : (
          <AiOutlineArrowDown className={styles.empty}/>
       )}
       <CellDeleteButton onRowRemove={onRowRemove}/>
     </div>
  )
}

export default CellMoveButtons