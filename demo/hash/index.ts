class MyMap {
  private hash: Record<any, any> = {}
  private length = 0

  constructor(data: Array<[any, any]> = []) {
    this.hash = {}

    data.forEach(([key, val]) => {
      this.set(key, val)
    })
  }

  public set(key: any, val: any) {
    this.hash[key] = val
    this.length++
  }

  public get(key: any) {
    return this.hash[key]
  }

  public has(key: any) {
    return key in this.hash
  }

  public remove(key: any) {
    if (!this.has(key)) return
    delete this.hash[key]
    this.length--
  }

  get size() {
    return this.length
  }
}

const map = new MyMap([
  ['a', undefined],
  ['b', 2],
  ['c', 3],
])

console.log(map)
