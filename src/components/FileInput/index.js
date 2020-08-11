import React, { useRef, useState } from 'react'

const FileInput = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const fileInput = useRef(null)

  const handleClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    fileInput.current.click()
  }

  const handleOnChange = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setLoading(true)
    console.log(event.currentTarget.files[0])

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
     <div>
       <input
          style={{ display: 'none' }}
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          ref={fileInput}
          multiple={false}
          onChange={handleOnChange}
       />

       {children(loading, handleClick)}
     </div>
  )
}

export default FileInput