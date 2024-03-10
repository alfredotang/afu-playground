import pipe from 'lodash/fp/pipe'
import upperCase from 'lodash/fp/upperCase'

const constantCase = (value: string) =>
  pipe(upperCase, item => item.replace(/\s/g, '_'))(value)

export default constantCase
