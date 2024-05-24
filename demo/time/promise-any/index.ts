const promiseAny = (promises: Array<Promise<unknown>>) =>
  new Promise((resolve, reject) => {
    const errors: unknown[] = []

    promises.map(promise => {
      promise.then(resolve).catch(error => {
        errors.push(error)
        if (errors.length === promises.length) {
          reject(errors)
        }
      })
    })
  })

export default promiseAny

// test
const pErr = new Promise((resolve, reject) => {
  reject('Always fails')
})

const pSlow = new Promise(resolve => {
  setTimeout(resolve, 101, 'pSlow')
})

const pFast = new Promise(resolve => {
  setTimeout(resolve, 100, 'pFast')
})

promiseAny([pErr, pFast, pSlow]).then(console.log).catch(console.error)
