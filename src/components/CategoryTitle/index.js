import React, { useContext, useState } from 'react'
import Btn from "components/Btn"
import { CategoriesContext } from "components/CategoriesContext"
import styles from 'components/Editor/editor.module.sass'

const ParentCategorySelector = ({
                                  skipCategoryId = 0,
                                  selectCategoryById = 0,
                                  onChange = () => {
                                  }
                                }) => {
  const categories = useContext(CategoriesContext)

  return (
     <select value={selectCategoryById} onChange={onChange}>
       <option key={0} value={0}>/</option>
       {categories
          .filter(({ id }) => id !== skipCategoryId)
          .map(({ id, path }) => (
             <option key={id} value={id}>
               {path}/
             </option>
          ))}
     </select>
  )
}

const CategoryTitle = ({
                         categoryId,
                         categoryParentId: initialPid = 0,
                         title: initialTitle,
                         path,
                         onChange
                       }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [pid, setPid] = useState(initialPid)

  const handleTitleClick = () => {
    setIsEdit(true)
  }

  const handleSaveClick = () => {
    setIsEdit(false)
    onChange({
      id: categoryId,
      pid: Number(pid),
      title
    })
  }

  return isEdit ? (
     <div className={styles.categoryEditor}>
       <div>
         <p>Родительская категория</p>
         <ParentCategorySelector
            skipCategoryId={categoryId}
            selectCategoryById={pid}
            onChange={({ target: { value } }) => setPid(value)}
         />
       </div>
       <div>
         <p>Название</p>
         <input
            autoFocus
            className={styles.edit}
            onChange={({ target: { value } }) => setTitle(value)}
            value={title}
         />
       </div>
       <Btn onClick={handleSaveClick} title="Сохранить"/>
     </div>
  ) : (
     <div
        onClick={handleTitleClick}
        className={styles.title}
     >
       {path}
     </div>
  )
}

export default React.memo(CategoryTitle)