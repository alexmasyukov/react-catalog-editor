import { COLUMN_TYPES } from "constants/common"
import { getColumnDefaultValue, itemMove, setCategoriesPaths } from "helpers"

const getNewCategory = (id) => ({
  id,
  title: 'Новая'
})


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
    ...getNewCategory(helpers.categoryIdMaker()),
    pid: id
  }

  const idx = categories.findIndex(category => category.id === id)

  const updated = [
    ...categories.slice(0, idx + 1),
    newCategory,
    ...categories.slice(idx + 1)
  ]

  return setCategoriesPaths(updated)
}

export const withNewCategory = ({ categories, helpers }) =>
   setCategoriesPaths([
     ...categories,
     getNewCategory(helpers.categoryIdMaker())
   ])


export const withUpdatedCategory = (updatedCategory, { categories }) => {
  const updated = categories.map(category =>
     category.id === updatedCategory.id ? {
       ...category,
       ...updatedCategory
     } : category
  )

  return setCategoriesPaths(updated)
}

export const withMovedImageInRow = (rowId, colKey, imageIdx, { rows, columns }) => {
  const idKey = columns.idKey

  return rows.map(row => {
    if (row[idKey] === rowId) {
      const images = row[colKey]
      return {
        ...row,
        [colKey]: itemMove(images, imageIdx, imageIdx - 1)
      }
    }

    return row
  })
}

export const withAddImageInRow = (rowId, colKey, image, { rows, columns }) => {
  const idKey = columns.idKey

  return rows.map(row => {
    if (row[idKey] === rowId) {
      const images = row[colKey]
      return {
        ...row,
        [colKey]: [...images, image]
      }
    }

    return row
  })
}

export const withoutCategory = (id, { categories, rows, columns }) => {
  const { cidKey } = columns
  const categoryToDelete = categories.find(({ id: requireId }) => requireId === id)
  // new pid is pid of deleting category or 0
  const newPidForChildCategories = 'pid' in categoryToDelete ? categoryToDelete.pid : 0

  const preparedCategories = categories.reduce((res, category) => {
    if (category.id === id) return res

    if ('pid' in category && category.pid === id) {
      // set new pid for child of deleting category
      return [...res, {
        ...category,
        pid: newPidForChildCategories
      }]
    }

    return [...res, category]
  }, [])

  const preparedRows = rows.filter(row => row[cidKey] !== id)

  return {
    categories: setCategoriesPaths(preparedCategories),
    rows: preparedRows
  }
}

