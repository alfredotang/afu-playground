import dayjs from 'dayjs'
import { TypeTagEnum } from '@src/constants/typeTag'

export default (value: any) => {
  const tag = Object.prototype.toString.call(value)
  const isNaN = tag === TypeTagEnum.Number && !Boolean(Number(value))
  if (isNaN) return TypeTagEnum.NaN
  if (tag === TypeTagEnum.String && dayjs(value).isValid()) {
    return TypeTagEnum.Date
  }
  return tag as TypeTagEnum
}
