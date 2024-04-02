function swap(arr: Array<number>, i: number, j: number) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function bubbleSort(nums: Array<number>) {
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

const sort = (arr: number[]) => {
  bubbleSort(arr)
}

const arr = [2, 2, 1, 5, 9, 7, 6, 8, 3]

sort(arr)
console.log(arr)
