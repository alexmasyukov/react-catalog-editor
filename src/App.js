import React, { useEffect, useReducer, useState } from 'react'
import Editor from "components/Editor"
import { COLUMN_TYPES } from "constants/common"
import { createCounter } from "helpers"
import axios from 'axios'
import './app.module.sass'
import { AiOutlineLoading } from "react-icons/ai"
import demoCatalog from "catalog.json"
import styles from "components/Editor/editor.module.sass"
import { ACTION_TYPES } from "store/actionTypes"
import { withNewRow } from "store/childReducers"

const baseUrl = 'https://xn--80aeff2a2ak7at8e.xn--p1ai'

const style = {
  textAlign: 'center'
}

const categories = [
  {
    id: 1,
    title: 'Гелиевые шары'
  },
  {
    id: 2,
    pid: 1,
    title: 'Цветные'
  },
  {
    id: 3,
    pid: 1,
    title: 'Матовые'
  },
  {
    id: 9,
    pid: 3,
    title: 'Большие'
  },
  {
    id: 4,
    title: 'Разное'
  }
]
const rows = [
  [2, 3, 'Шар «Котёнок-единорожка»', 1650, true, true, true, false],
  [12, 4, 'Шар С Днем Рождения, хром', 100, true, true, false, false],
  [14, 4, 'Связка Человек Паук', 1200, true, true, true, true],
  [16, 4, 'Связка красных шаров', 4300, true, false, true, false]
]


const columns = [
  {
    id: 1,
    title: 'ID',
    type: COLUMN_TYPES.ID,
    name: 'id',
    order: 1
  },
  {
    id: 2,
    title: 'CID',
    type: COLUMN_TYPES.CATEGORY_ID,
    name: 'cid',
    // hidden: true,
    default: '',
    order: 2
  },
  {
    id: 3,
    title: 'Название',
    type: COLUMN_TYPES.STRING,
    name: 'name',
    default: '',
    order: 3
  },
  {
    id: 4,
    title: 'Цена',
    type: COLUMN_TYPES.NUMBER,
    name: 'price',
    default: 0,
    order: 4
  },
  {
    id: 5,
    title: 'Опубликовано',
    type: COLUMN_TYPES.CHECK,
    name: 'public',
    default: true,
    style,
    order: 5
  },
  {
    id: 13,
    title: 'В наличии',
    type: COLUMN_TYPES.CHECK,
    name: 'nalichiye',
    default: true,
    order: 6,
    style
  },
  {
    id: 15,
    title: 'Хит',
    type: COLUMN_TYPES.CHECK,
    name: 'khit',
    default: false,
    order: 7,
    style
  },
  {
    id: 14,
    title: 'Новинка',
    type: COLUMN_TYPES.CHECK,
    name: 'novinka',
    default: false,
    order: 8,
    style
  },
  // {
  //   id: 16,
  //   title: 'Товар недели',
  //   type: COLUMN_TYPES.CHECK,
  //   name: 'tovar--nedeli',
  //   default: false,
  //   order: 9,
  //   style
  // },
  // {
  //   id: 11,
  //   title: 'Скидка %',
  //   type: COLUMN_TYPES.NUMBER,
  //   name: 'skidka',
  //   default: '12',
  //   order: 10
  // },
  {
    id: 6,
    title: 'Описание',
    type: COLUMN_TYPES.TEXT,
    name: 'description',
    default: '',
    order: 11
  },
  {
    id: 30,
    title: 'Фото',
    type: COLUMN_TYPES.IMAGES,
    name: 'images',
    default: [
      ['small_27_03_2020_09_08_53_779J6zxr.jpg', '27_03_2020_09_08_53_779J6zxr.jpg'],
      ['small_10_03_2020_11_28_42_172NfmB6.jpg', '10_03_2020_11_28_42_172NfmB6.jpg']
    ],
    order: 12
  }
]

const initialConfig = {
  idCounter: createCounter(1),
  cidCounter: createCounter(1),
  getImage: (img) => `${baseUrl}/sync/${img}`,
  uploadImageUrl: `${baseUrl}/cms/pages/db_orders/get_img_test.php`
}

const initialState = {
  loading: false,
  config: initialConfig,
  data: {
    columns: [],
    rows: [],
    categories: []
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DATA_REQUEST:
      return {
        ...initialState,
        loading: true,
        error: false
      }

    case ACTION_TYPES.FETCH_DATA_SUCCESS:
      const lastRowsId = Math.max(...action.data.rows.map(({ id = 0 }) => id))
      const lastCid = Math.max(...action.data.categories.map(({ id = 0 }) => id))
      return {
        ...state,
        data: { ...action.data },
        config: {
          ...state.config,
          idCounter: createCounter(lastRowsId + 1),
          cidCounter: createCounter(lastCid + 1)
        },
        loading: false,
        error: false
      }

    case ACTION_TYPES.FETCH_DATA_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: 'error'
      }

    default:
      return state
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOnChange = (data) => {
    // console.log('handleOnChange', data)
  }

  const fetchData = async () => {
    dispatch({
      type: ACTION_TYPES.FETCH_DATA_REQUEST
    })

    // setTimeout(() => {
    //   const { rows, categories } = demoCatalog
    //   dispatch({
    //     type: ACTION_TYPES.FETCH_DATA_SUCCESS,
    //     data: {
    //       rows,
    //       categories,
    //       columns
    //     }
    //   })
    // }, 0)

    try {
      const result = await axios.get(`${baseUrl}/api/v1/catalog/read.php`)
      dispatch({
        type: ACTION_TYPES.FETCH_DATA_SUCCESS,
        data: {
          ...result.data,
          columns
        }
      })
    } catch (e) {
      dispatch({
        type: ACTION_TYPES.FETCH_DATA_FAILURE,
        loading: false,
        error: 'Ошибка загрузки каталога'
      })
      console.log('fetchData', e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
     <div className="App">
       {state.error && <h3>{state.error}</h3>}
       {state.loading ? (
          <div className={styles.loading}>
            <AiOutlineLoading className={styles.iconSpin}/>
            {` `}
            Загрузка каталога...
          </div>
       ) : (
          <Editor
             config={state.config}
             data={state.data}
             onChange={handleOnChange}/>
       )}
     </div>
  )
}

export default App
