import { COLUMN_TYPES } from "constants/common"
import { getColumnDefaultValue, setCategoriesPaths } from "helpers"

export const withNewRow = (cid, { columns, helpers, rows }) => {
  const newRow = columns.keys.reduce((res, key) => {
    const column = columns.byKey[key]
    let defaultValue = ''

    switch (column.type) {
      case COLUMN_TYPES.ID:
        defaultValue = helpers.rowIdMaker()
        break

      case COLUMN_TYPES.CATEGORY_ID:
        defaultValue = cid
        break

      default:
        defaultValue = getColumnDefaultValue(column.default)
    }

    return {
      ...res,
      [key]: defaultValue
    }
  }, {})

  return [...rows, newRow]
}


export const withNewChildCategory = (id, { helpers, categories }) => {
  const newCategory = {
    id: helpers.categoryIdMaker(),
    pid: id,
    title: 'Новая'
  }

  const idx = categories.findIndex(category => category.id === id)

  const updated = [
    ...categories.slice(0, idx + 1),
    newCategory,
    ...categories.slice(idx + 1)
  ]

  return setCategoriesPaths(updated)
}

export const withUpdatedCategory = (updatedCategory, { categories }) => {
  const updated = categories.map(category =>
     category.id === updatedCategory.id ? {
       ...category,
       ...updatedCategory
     } : category
  )

  return setCategoriesPaths(updated)
}

