/* eslint-disable @typescript-eslint/no-unused-vars */
export type Callback = (...args: unknown[]) => void

const a = (callback: Callback) => {
  setTimeout(() => callback('a'), 1000)
}
const b = (callback: Callback) => {
  setTimeout(() => callback('b'), 500)
}
const c = (callback: Callback) => {
  setTimeout(() => callback('c'), 100)
}

const log = (...args: any[]) => console.log(...args)

function compose(...fns: Array<(cb: Callback) => void>) {
  return fns.reduceRight(
    (acc, fn, index) => {
      return (cb: Callback) => {
        fn((...args) => {
          cb(...args)
          if (index < fns.length - 1) acc(cb)
        })
      }
    },
    (cb: Callback) => cb()
  )
}

const main = (callback: Callback) => (fns: Array<(cb: Callback) => void>) =>
  compose(...fns)(callback)

const logCallback = main(log)

// logCallback([a, b, c])

const wrapper = (callback: Callback) => (fn: (cb: Callback) => void) =>
  new Promise<void>(resolve => {
    fn((...args: any[]) => {
      callback(...args)
      resolve()
    })
  })

const main2 = async (
  callback: Callback,
  fns: Array<(cb: Callback) => void>
) => {
  const asyncWrapper = wrapper(callback)

  fns.reduce(async (acc, fn) => {
    await acc
    asyncWrapper(fn)
  }, Promise.resolve())
}

// main2(log, [a, b, c])
