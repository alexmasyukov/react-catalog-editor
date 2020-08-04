import React from 'react'
import Editor from "pages/editor"
import { PROP_TYPES } from "constants/common"

const data = {
  properties: [
    {
      id: 1,
      title: 'ID',
      type: PROP_TYPES.LABEL,
      default: '',
      order: 1
    },
    {
      id: 2,
      title: 'Название',
      default: '',
      order: 2
    },
    {
      id: 3,
      title: 'Цена',
      type: PROP_TYPES.NUMBER,
      default: 0,
      order: 3
    },
    {
      id: 9,
      title: 'Опубликовано',
      type: PROP_TYPES.CHECK,
      default: true,
      style: {
        textAlign: 'center'
      },
      order: 4
    },
    {
      id: 10,
      title: 'В наличии',
      type: PROP_TYPES.CHECK,
      default: true,
      style: {
        textAlign: 'center'
      },
      order: 5
    },
    {
      id: 11,
      title: 'Хит продаж',
      type: PROP_TYPES.CHECK,
      default: false,
      style: {
        textAlign: 'center'
      },
      order: 6
    },
    {
      id: 12,
      title: 'Новинка',
      type: PROP_TYPES.CHECK,
      default: false,
      style: {
        textAlign: 'center'
      },
      order: 7
    },
    {
      id: 4,
      title: 'Скидка %',
      type: PROP_TYPES.NUMBER,
      default: 12,

    },
    {
      id: 5,
      title: 'Цена со скидкой',
      type: PROP_TYPES.NUMBER,
      formula(price = 0, sale = 0) {
        return (price / 100) * (100 - sale)
      },
      default: ''
    },
    {
      id: 7,
      title: 'Измеряется',
      type: PROP_TYPES.STRING,
      default: 'шт',
      order: 8
    },
    {
      id: 6,
      title: 'Описание',
      type: PROP_TYPES.TEXT,
      default: ''
    }
  ],
  categories: [
    {
      id: 1,
      title: 'Гелиевые шары',
      order: 1
    },
    {
      id: 2,
      title: 'Цветные',
      order: 2
    },
    {
      id: 3,
      title: 'Матовые',
      order: 3
    },
    {
      id: 4,
      title: 'Разное',
      order: 4
    }
  ],
  rows: [
    {
      id: 1,
      cid: 3,
      values: [1, 'Шар «Котёнок-единорожка»', 1650, true, true, true, false]
    },
    {
      id: 2,
      cid: 4,
      values: [2, 'Шар С Днем Рождения, хром', 100, true, true, false, false]
    },
    {
      id: 3,
      cid: 4,
      values: [3, 'Связка Человек Паук', 1200, true, true, true, true]
    }
  ]
}

function App() {
  return (
     <div className="App">
       <Editor data={data}/>
     </div>
  )
}

export default App
