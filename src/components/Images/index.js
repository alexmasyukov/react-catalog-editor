import React, { useContext } from 'react'
import cn from 'classnames'
import { HandlersContext } from "components/HandersContext"
import {
  AiOutlineArrowLeft,
  AiOutlineCloudUpload,
  AiOutlineLoading
} from "react-icons/ai"
import FileInput from "components/FileInput"
import styles from 'components/Editor/editor.module.sass'


const Images = ({ rowId, colKey, items = [], uploadImageUrl = '' }) => {
  const handlers = useContext(HandlersContext)

  return (
     <div className={styles.images}>
       {items.map((images, idx) => {
         const [smallImg] = images
         return (
            <div
               key={idx}
               className={cn(styles.img, idx > 0 && styles.btnImgMoveLayer)}
               onClick={handlers.onImageMoveLeft(rowId, colKey, idx)}
            >
              {idx > 0 && (
                 <AiOutlineArrowLeft className={styles.btnImageLeft}/>
              )}
              <img
                 src={handlers.getImage(smallImg)}
                 alt=""
              />
            </div>
         )
       })}
       <div className={cn(styles.img, styles.btnImgageUpload)}>
         <FileInput
            uploadUrl={uploadImageUrl}
            onUpload={handlers.onAddImage(rowId, colKey)}
         >
           {(loading, onClick) =>
              loading ? (
                 <AiOutlineLoading className={styles.iconSpin}/>
              ) : (
                 <AiOutlineCloudUpload onClick={onClick}/>
              )
           }
         </FileInput>

       </div>

     </div>
  )
}


export default React.memo(Images)