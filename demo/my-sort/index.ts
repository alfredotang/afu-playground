function swap(arr: Array<number>, i: number, j: number) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function quickSort(nums: Array<number>): Array<number> {
  if (nums.length <= 1) return nums
  let pivot = nums[0]
  let left: Array<number> = []
  let right: Array<number> = []

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < pivot) {
      left.push(nums[i])
    } else {
      right.push(nums[i])
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}

function bubbleSort(nums: Array<number>): Array<number> {
  let swapped = true
  for (let i = 0; i < nums.length && swapped; i++) {
    swapped = false
    for (let j = 0; j < nums.length - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        swapped = true
        swap(nums, j, j + 1)
      }
    }
  }
  return nums
}

const arr = [2, 2, 1, 5, 9, 7, 6, 8, 3]
const qs_arr = arr.slice()
quickSort(qs_arr)
console.log('quick sort', qs_arr)

const bs_arr = arr.slice()
bubbleSort(bs_arr)
console.log('bubble sort', bs_arr)
