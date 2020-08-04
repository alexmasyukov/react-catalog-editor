export const getPropKeyName = (id) => `p${id}`
export const getCategoryKeyName = (id) => `c${id}`
export const getRowKeyName = (id) => `r${id}`

export const assignWithEmptyShema = (byKey) => ({
  byKey,
  get values() {
    return Object.values(this.byKey)
  },
  get keys() {
    return Object.keys(this.byKey)
  }
})