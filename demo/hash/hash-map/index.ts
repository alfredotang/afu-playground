class Pair {
  key: string
  value: string

  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }
}

export class HashMap {
  map: Array<Pair | null>
  size: number
  capacity: number

  constructor() {
    this.size = 0
    this.capacity = 2
    this.map = new Array(this.capacity).fill(null)
  }

  hash(key: string) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % this.capacity
  }

  get(key: string) {
    let index = this.hash(key)
    while (this.map[index] != null) {
      if (this.map[index]?.key == key) {
        return this.map[index]?.value
      }
      index = (index + 1) % this.capacity
    }
    return undefined
  }

  put(key: string, value: string) {
    let index = this.hash(key)

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.map[index] == null) {
        this.map[index] = new Pair(key, value)
        this.size++
        if (this.size >= this.capacity / 2) {
          this.rehash()
        }
        break
      }

      if (this.map?.[index]?.key === key) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.map[index].value = value
        break
      }
      index = (index + 1) % this.capacity
    }
  }

  rehash() {
    this.capacity *= 2
    const oldMap = this.map
    this.map = new Array(this.capacity).fill(null)
    this.size = 0

    for (let i = 0; i < oldMap.length; i++) {
      if (oldMap[i]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.put(oldMap[i].key, oldMap[i].value)
      }
    }
  }

  remove(key: string) {
    if (this.get(key) == null) return
    let index = this.hash(key)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.map[index]?.key === key) {
        this.map[index] = null
        this.size--
        return
      }
      index = (index + 1) % this.capacity
    }
  }
  print() {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log(this.map[i].key + ' ' + this.map[i].value)
      }
    }
  }
}

const map = new HashMap()
map.put('a', '1')
map.put('b', '2')
map.put('c', '3')
map.put('d', '4')

map.print()
