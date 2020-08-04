import React from 'react'
import Editor from "pages/editor"
import { PROP_TYPES } from "constants/common"

const data = {
  properties: [
    {
      id: 3,
      title: 'Название',
    },
    {
      id: 4,
      title: 'Цена',
      type: PROP_TYPES.NUMBER
    },
    {
      id: 1,
      title: 'Хит продаж',
      type: PROP_TYPES.CHECK,
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 2,
      title: 'Новинка',
      type: PROP_TYPES.CHECK,
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 5,
      title: 'ID',
      type: PROP_TYPES.LABEL
    }
  ],
  categories: [
    {
      id: 1,
      title: 'Шары',
      order: 1,
      is: {
        rename: true,
        delete: true,
        move: true
      },
      properties: [ //order НЕ ПРАВИЛЬНО РАБОТАЕТ
        { id: 5 },
        { id: 3 }, //Название
        { id: 4 }, //Цена
        {
          id: 1, //Хит продаж
          is: {
            rename: false,
            delete: false
          }
        },
        { id: 2 } // Новинка
      ]
    }
  ],
  rows: [
    {
      id: 1,
      cid: 1,
      values: [1, 'Шар «Котёнок-единорожка»', 1650, true, false]
    },
    {
      id: 2,
      cid: 1,
      values: [2, 'Шар С Днем Рождения, хром', 100, false, false]
    },
    {
      id: 3,
      cid: 1,
      values: [3, 'Связка Человек Паук', 1200, true, true]
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
