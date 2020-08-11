import React, { useContext } from 'react'
import cn from 'classnames'
import axios from 'axios'
import { HandlersContext } from "components/HandersContext"
import {
  AiOutlineArrowLeft,
  AiOutlineCloudUpload,
  AiOutlineLoading
} from "react-icons/ai"
import FileInput from "components/FileInput"
import styles from 'components/Editor/editor.module.sass'


const Images = ({ rowId, colKey, items = [] }) => {
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
              {idx > 0 && <AiOutlineArrowLeft className={styles.btnImageLeft}/>}
              <img
                 src={handlers.getImage(smallImg)}
                 alt=""
              />


              {/*<input id="files" type="file" accept="image/*"*/}
              {/*onChange={(event) => {*/}
              {/*setIsLoading(true)*/}

              {/*uploadImages(event.currentTarget.files[0])*/}
              {/*.then(result => {*/}
              {/*if (Array.isArray(field.value)) {*/}
              {/*form.setFieldValue(field.name, [...field.value, result.lg[0]])*/}
              {/*} else {*/}
              {/*form.setFieldValue(field.name, result.thumb[0])*/}
              {/*}*/}
              {/*setIsLoading(false)*/}
              {/*})*/}
              {/*}}/>*/}
            </div>
         )
       })}
       <div className={cn(styles.img, styles.btnImgageUpload)}>
         <FileInput>
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


const uploadImages = (files) => {
  const data = new FormData()
  data.append('attachments', files)
  return axios.post('', data, { //this._uploadImagesBase
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
     .then(res => res.data.result)
     .catch(err => {
       alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
       // this._apiErrHandler(err)
     })
}


export default React.memo(Images)