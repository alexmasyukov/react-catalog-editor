import React from 'react'
import Editor from "pages/editor"
import { COLUMN_TYPES } from "constants/common"
import { createCounter } from "helpers"

const categories = [
  {
    id: 1,
    title: 'Гелиевые шары',
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

const lastRowsId = Math.max(...rows.map(([id = 0]) => id))
const lastCid = Math.max(...categories.map(({ id = 0 }) => id))


const data = {
  helpers: {
    categoryIdMaker: createCounter(lastCid + 1),
    rowIdMaker: createCounter(lastRowsId + 1)
  },
  columns: [
    {
      id: 99,
      title: 'ID',
      type: COLUMN_TYPES.ID,
      order: 1
    },
    {
      id: 1,
      title: 'CID',
      type: COLUMN_TYPES.CATEGORY_ID,
      // hidden: true,
      default: (cid) => cid,
      order: 1
    },
    {
      id: 2,
      title: 'Название',
      type: COLUMN_TYPES.STRING,
      default: '',
      order: 2
    },
    {
      id: 3,
      title: 'Цена',
      type: COLUMN_TYPES.NUMBER,
      default: 0,
      order: 3
    },
    {
      id: 9,
      title: 'Опубликовано',
      type: COLUMN_TYPES.CHECK,
      default: true,
      style: {
        textAlign: 'center'
      },
      order: 4
    },
    {
      id: 10,
      title: 'В наличии',
      type: COLUMN_TYPES.CHECK,
      default: true,
      style: {
        textAlign: 'center'
      },
      order: 5
    },
    {
      id: 11,
      title: 'Хит продаж',
      type: COLUMN_TYPES.CHECK,
      default: false,
      style: {
        textAlign: 'center'
      },
      order: 6
    },
    {
      id: 12,
      title: 'Новинка',
      type: COLUMN_TYPES.CHECK,
      default: false,
      style: {
        textAlign: 'center'
      },
      order: 7
    },
    {
      id: 4,
      title: 'Скидка %',
      type: COLUMN_TYPES.NUMBER,
      default: '12'
    },
    {
      id: 5,
      title: 'Цена со скидкой',
      type: COLUMN_TYPES.NUMBER,
      default: ''
    },
    {
      id: 7,
      title: 'Измеряется',
      type: COLUMN_TYPES.STRING,
      default: 'шт',
      order: 8
    },
    {
      id: 6,
      title: 'Описание',
      type: COLUMN_TYPES.TEXT,
      default: ''
    }
  ],
  categories,
  rows
}

function App() {
  const handleOnChange = () => {
    console.log('handleOnChange')
    // formula(price = 0, sale = 0) {
    //   return (price / 100) * (100 - sale)
    // },
    // }
  }

  return (
     <div className="App">
       <Editor
          data={data}
          onChange={handleOnChange}/>
     </div>
  )
}

export default App
