export class LinkedNode {
  public val: any = null
  public next: LinkedNode | null = null
  public prev: LinkedNode | null = null
  constructor(
    val: any,
    prev: LinkedNode | null = null,
    next: LinkedNode | null = null
  ) {
    this.val = val
    this.prev = prev
    this.next = next
  }
}

export class LinkedList {
  public head: LinkedNode | null = null
  public tail: LinkedNode | null = null
  public size = 0

  public addAtHead(val: any) {
    const node = new LinkedNode(val)
    if (!this.head) {
      this.head = node
      this.tail = node
      this.size++
      return
    }

    node.next = this.head
    this.head.prev = node
    this.head = node

    this.size++
  }

  public addAtTail(val: any) {
    if (!this.size) {
      this.addAtHead(val)
      return
    }

    const node = new LinkedNode(val, this.tail, null)

    if (this.tail) {
      this.tail.next = node
    }

    this.tail = node
    this.size++
  }

  public addAtIndex(index: number, val: any) {
    if (index < 0 || index > this.size) {
      return
    }

    if (index === 0) {
      this.addAtHead(val)
      return
    }

    if (index === this.size) {
      this.addAtTail(val)
      return
    }

    let i = 0
    let current = this.head

    while (i < index && current) {
      current = current.next
      i++
    }

    const node = new LinkedNode(val, current?.prev, current)
    node.prev && (node.prev.next = node)
    node.next && (node.next.prev = node)
    this.size++
  }

  public deleteAtIndex(index: number) {
    if (index < 0 || index >= this.size) {
      return
    }

    if (index === 0) {
      this.head = this.head?.next || null
      this.head && (this.head.prev = null)
      this.size--
      return
    }

    if (index === this.size - 1) {
      this.tail = this.tail?.prev || null
      this.tail && (this.tail.next = null)
      this.size--
      return
    }

    let i = 0
    let current = this.head

    while (i < index && current) {
      current = current.next
      i++
    }

    if (!current) return

    current.prev && (current.prev.next = current.next)
    current.next && (current.next.prev = current.prev)
    this.size--
  }

  public get(index: number) {
    if (index < 0 || index >= this.size) {
      return -1
    }

    if (index === 0) {
      return this.head?.val != null ? this.head.val : -1
    }
    if (index === this.size - 1) {
      return this.tail?.val != null ? this.tail.val : -1
    }

    let i = 0
    let current = this.head

    while (i < index && current) {
      current = current.next
      i++
    }

    return current?.val != null ? current.val : -1
  }

  print() {
    let current = this.head
    const res = []
    while (current) {
      res.push(current.val)
      current = current.next
    }

    console.log(res)
  }
}
