class QueueNode {
  constructor(val, next) {
    this.val = val
    this.next = next
  }
}

class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  enqueue(val) {
    this.length++
    const node = new QueueNode(val)
    if (this.tail != null) {
      this.tail.next = node
      this.tail = node
      return
    }

    this.head = node
    this.tail = node
  }

  dequeue() {
    if (this.head == null) {
      return null
    }

    this.length--

    const { val } = this.head
    this.head = this.head.next
    if (!this.head) {
      this.tail = null
    }
    return val
  }

  peek() {
    if (this.head == null) {
      return null
    }
    return this.head.val
  }

  get size() {
    return this.length
  }

  get isEmpty() {
    return this.length === 0
  }
}
