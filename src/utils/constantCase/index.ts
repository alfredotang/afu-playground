import upperCase from 'lodash/fp/upperCase'
import pipe from 'lodash/fp/pipe'

const constantCase = (value: string) => pipe(upperCase, item => item.replace(/\s/g, '_'))(value)

export default constantCase
