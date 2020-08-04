import React from 'react'
import Properties from "components/Properties"
import Row from "components/Row"
import styles from "pages/editor.module.sass"

const Rows = ({ items  }) => {
  return (
     <table className={styles.products}>
       <tbody>
       <Properties/>
       {items.entries(([key, value]) => (
          <Row key={key} rowKey={key} {...value}/>
       ))}
       </tbody>
     </table>
  )
}

export default Rows