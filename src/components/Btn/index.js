import React from 'react'
import styles from "pages/editor.module.sass"

const Btn = ({ onClick = () => {}, title = '' }) => (
   <div className={styles.btn} onClick={onClick}>{title}</div>
)

export default Btn