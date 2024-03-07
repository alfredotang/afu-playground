import pipe from 'lodash/fp/pipe'
import camelCase from 'lodash/fp/camelCase'
import upperFirst from 'lodash/fp/upperFirst'

export default (value: string) => pipe(camelCase, upperFirst)(value)
