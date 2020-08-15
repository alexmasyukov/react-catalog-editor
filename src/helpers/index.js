export const getColumnKeyName = (id) => `col${id}`
// export const getCategoryKeyName = (id) => `c${id}`

export const assignWithEmptyShema = (byKey) => ({
  byKey,
  get values() {
    return Object.values(this.byKey)
  },
  get keys() {
    return Object.keys(this.byKey)
  }
})

export const itemMove = (array, from, to) => {
  const update = [...array]
  update[to] = array[from]
  update[from] = array[to]
  return update
}

export const compose = (...funcs) => x => funcs.reduceRight((r, f) => f(r), x)

export function createCounter(start) {
  let id = start
  return function () {
    return id++
  }
}

export const getColumnDefaultValue = (defaultValue) =>
  typeof (defaultValue) === 'function' ? defaultValue() : defaultValue


export const getCategoryById = (id, categories) =>
   categories.find(category => category.id === id)


export const getCategoryPath = (id, categories = [], init = []) => {
  const category = getCategoryById(id, categories)

  return 'pid' in category && category.pid !== 0 && category.pid !== '0' ?
     getCategoryPath(category.pid, categories, [category.name, ...init]) :
     [category.name, ...init].join('/')
}

export const setCategoriesPaths = (categories) => {
  const getPath = (id) => getCategoryPath(id, categories)

  return categories.map(category => ({
    ...category,
    path: getPath(category.id)
  }))
}