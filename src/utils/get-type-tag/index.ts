import { TypeTagEnum } from '@src/constants/typeTag'
import isNull from 'lodash/fp/isNull'
import isNaN from 'lodash/fp/isNaN'

export default (value: any) => {
  if (isNull(value)) return TypeTagEnum.Null
  if (isNaN(value)) return TypeTagEnum.NaN
  const tag = Object.prototype.toString.call(value)
  return tag as TypeTagEnum
}
