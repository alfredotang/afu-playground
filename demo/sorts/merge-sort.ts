export function mergeSort(arr: number[], l: number, r: number) {
  if (l < r) {
    // Find the middle point of arr
    const m = Math.floor((l + r) / 2)

    mergeSort(arr, l, m) // sort left half
    mergeSort(arr, m + 1, r) // sort right half
    merge(arr, l, m, r) // merge sorted halfs
  }
  return arr
}

function merge(arr: number[], l: number, m: number, r: number) {
  // Find lengths of two subarrays to be merged
  const length1 = m - l + 1
  const length2 = r - m

  // Create temp arrays
  const L = new Array(length1)
  const R = new Array(length2)

  // Copy the sorted left & right halfs to temp arrays
  for (let i = 0; i < length1; i++) {
    L[i] = arr[l + i]
  }

  for (let j = 0; j < length2; j++) {
    R[j] = arr[m + 1 + j]
  }

  // initial indexes of left and right sub-arrays
  let i = 0 // index for left
  let j = 0 // index for right
  let k = l // Initial index of merged subarray array

  // Merge the two sorted halfs leto the original array
  while (i < length1 && j < length2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i]
      i++
    } else {
      arr[k] = R[j]
      j++
    }
    k++
  }
  // One of the halfs will have elements remaining
  while (i < length1) {
    arr[k] = L[i]
    i++
    k++
  }
  while (j < length2) {
    arr[k] = R[j]
    j++
    k++
  }
}

function sort(arr: number[]) {
  mergeSort(arr, 0, arr.length - 1)
}

function toSort(arr: number[]) {
  const copy = arr.slice()
  mergeSort(copy, 0, copy.length - 1)
  return copy
}

const arr = [12, 11, 13, 5, 6, 7]
const arr2 = [11, 12, 13, 5, 6, 7]
sort(arr)
console.log(arr)
console.log(toSort(arr2))
console.log(arr2)
