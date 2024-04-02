export function quickSort(arr: number[], start: number, end: number) {
  if (end - start + 1 <= 1) {
    return arr
  }

  const pivot = arr[end]
  let left = start // pointer for left side

  // Partition: elements smaller than pivot on left side
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      ;[arr[i], arr[left]] = [arr[left], arr[i]]
      left++
    }
  }

  // Move pivot in-between left & right sides
  arr[end] = arr[left]
  arr[left] = pivot

  // Quick sort left side
  quickSort(arr, start, left - 1)

  // Quick sort right side
  quickSort(arr, left + 1, end)

  return arr
}

const arr = [2, 2, 1, 5, 9, 7, 6, 8, 3]

const sort = (arr: number[]) => {
  quickSort(arr, 0, arr.length - 1)
}

sort(arr)

console.log(arr)
