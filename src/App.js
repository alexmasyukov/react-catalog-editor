import React from 'react'
import Editor from "pages/editor"
import { PROP_TYPES } from "constants/common"

const data = {
  properties: [
    {
      id: 3,
      title: 'Название',
      type: PROP_TYPES.STRING
    },
    {
      id: 4,
      title: 'Цена',
      type: PROP_TYPES.NUMBER
    },
    {
      id: 1,
      title: 'Хит продаж',
      type: PROP_TYPES.CHECK
    },
    {
      id: 2,
      title: 'Новинка',
      type: PROP_TYPES.CHECK
    },
    {
      id: 5,
      title: 'ID',
      type: PROP_TYPES.ID
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
        { id: 5, order: 1 },
        { id: 3, order: 2 }, //Название
        { id: 4, order: 3 }, //Цена
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
  products: [
    {
      id: 1,
      cid: 1,
      values: ['Шар «Котёнок-единорожка»', 1650, true, false]
    },
    {
      id: 2,
      cid: 1,
      values: ['Шар С Днем Рождения, хром', 100, false, false]
    },
    {
      id: 3,
      cid: 1,
      values: ['Связка Человек Паук', 1200, true, true]
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
