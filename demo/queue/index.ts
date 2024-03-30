class Node {
  public val: any
  public next: Node | null
  constructor(val: any, next: Node | null = null) {
    this.val = val
    this.next = next
  }
}

export class Queue {
  private head: Node | null = null
  private tail: Node | null = null
  private length = 0

  enqueue(val: any) {
    this.length++
    const node = new Node(val)
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
