export function findIndex(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return i
    }
  }
  return -1
}

export function find(array, callback) {
  const index = findIndex(array, callback)
  return array[index]
}

export function splice(array, start, count) {
  const length = count || 1
  for (let i = start; i < array.length - length; i++) {
    array[i] = array[i + length]
  }
  array.length = Math.max(start, array.length - length)
  return array
}
