import React from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete } from "react-icons/ai"
import styles from 'pages/editor.module.sass'

const CellMoveButtons = ({
                           upVisible = true,
                           downVisible = true,
                           onRowMoveUp,
                           onRowMoveDown
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
     </div>
  )
}

export default CellMoveButtons