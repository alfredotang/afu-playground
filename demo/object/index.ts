/* eslint-disable @typescript-eslint/ban-ts-comment */

const obj = {
  num: 2,
  getNum() {
    return this.num
  },
  // @ts-expect-error
  getNumByArrow: () => this.num,
  getAge() {
    return this.getNum()
  },
}

const getNum = obj.getNum

const obj2 = Object.create({ num: NaN })

// @ts-ignore
obj2.getNum = obj.getNum

console.log(obj.getNum())
console.log(obj.getNumByArrow())

console.log(obj.getAge())

console.log(getNum())

// @ts-ignore
console.log(obj2.getNum())
// @ts-ignore
console.log(obj2.getNum.call(obj))

console.log(obj.getNum.call(obj2))

const m = [1, 2, 3].map(x => {
  if (typeof x === 'number') {
    return
  }
  return x
})

console.log(m)

function bark() {
  console.log('Woof!')
}
bark.animal = 'dog'

console.log(bark.animal)
