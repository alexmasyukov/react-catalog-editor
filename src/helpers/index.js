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

export const itemMove = (array, from, to) => {
  const update = [...array]
  update[to] = array[from]
  update[from] = array[to]
  return update

  // const prevOrNext = array[to]
  //
  // const part_one = array.slice(0, from - 1)
  // const part_two = array.slice(from + 1)

  // console.log('prevOrNext', prevOrNext)
  // console.log('current', current)
  // console.log('part_one', part_one)
  // console.log('part_two', part_two)
  // const res = [...part_one, current, prevOrNext, ...part_two]
  // console.log(res)

  // return res
}