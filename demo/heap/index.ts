// priority queue
export default class Heap {
  private heap = [0]

  constructor(nums?: number[]) {
    if (nums?.length) {
      nums.forEach(num => {
        this.push(num)
      })
    }
  }

  public heapify(arr: number[]) {
    arr.push(arr[arr.length - 1])
    this.heap = arr
    const n = this.heap.length

    let i = Math.floor(n / 2)
    while (i > 0) {
      let curr = i
      while (curr * 2 < n) {
        let j = curr * 2
        if (j + 1 < n && arr[j] > arr[j + 1]) j++
        if (arr[curr] > arr[j]) {
          ;[arr[curr], arr[j]] = [arr[j], arr[curr]]
          curr = j
        } else {
          break
        }
      }
    }
    i--
  }

  public push(val: number) {
    this.heap.push(val)
    if (this.heap.length === 2) return
    let i = this.heap.length - 1
    while (
      i >= 1 &&
      Math.floor(i / 2) >= 1 &&
      this.heap[i] < this.heap[Math.floor(i / 2)]
    ) {
      ;[this.heap[i], this.heap[Math.floor(i / 2)]] = [
        this.heap[Math.floor(i / 2)],
        this.heap[i],
      ]
      i = Math.floor(i / 2)
    }
  }

  public pop() {
    if (this.heap.length === 1) return null
    if (this.heap.length === 2) return this.heap.pop()
    const res = this.heap[1]
    this.heap[1] = this.heap.pop() as number
    let i = 1
    const n = this.heap.length

    while (i * 2 < n) {
      let j = i * 2
      if (
        j + 1 < n &&
        this.heap[i] > this.heap[j + 1] &&
        this.heap[i * 2] > this.heap[j + 1]
      ) {
        j++
      }
      if (this.heap[i] > this.heap[j]) {
        ;[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
        i = j
        continue
      }

      break
    }

    return res
  }

  get size() {
    return this.heap.length - 1
  }

  get top() {
    return this.heap[1]
  }

  public print() {
    console.log(this.heap.slice(1))
  }
}

const heap = new Heap([4, 5, 3, 2])
heap.push(1)
console.log(heap.top)
console.log(heap.size)
// heap.push(3.6)

heap.print()
