export const moveZeroes = (nums: number[]) => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      let k = i + 1

      while (nums[k] === 0 && k < nums.length) {
        k++
      }

      if (k < nums.length) {
        ;[nums[i], nums[k]] = [nums[k], nums[i]]
      }
    }
  }
}

const arr = [1, 0, 1, 0, 3, 5]

moveZeroes(arr)

console.log(arr)
