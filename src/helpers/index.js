export const getColumnKeyName = (id) => `p${id}`
export const getCategoryKeyName = (id) => `c${id}`

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


