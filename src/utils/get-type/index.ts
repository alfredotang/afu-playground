import { TypeTagEnum } from '@src/constants/typeTag'
import getTypeTag from '@src/utils/get-type-tag'

const getUniqueTypes = (values: any[]): string[] => {
  return Array.from(new Set(values.map((value: any) => getType(value))))
}

const getType = (value: any): string => {
  if (value === undefined) {
    return 'any'
  }

  const typeTag = getTypeTag(value)

  if (typeTag === TypeTagEnum.String) {
    return 'string'
  }

  if (typeTag === TypeTagEnum.Null) {
    return 'null'
  }

  if (typeTag === TypeTagEnum.Object) {
    const objectProperties = Object.entries(value)
      .map(([key, value]) => `${key}: ${getType(value)}`)
      .join(', ')

    return `{ ${objectProperties} }`
  }

  if (typeTag === TypeTagEnum.Map) {
    const keyTypes = getUniqueTypes(Array.from(value.keys()))
    const valueTypes = getUniqueTypes(Array.from(value.values()))
    const keyType = keyTypes.length === 1 ? keyTypes[0] : keyTypes.join('|')
    const valueType =
      valueTypes.length === 1 ? valueTypes[0] : valueTypes.join('|')
    return `Map<${keyType}, ${valueType}>`
  }

  if (typeTag === TypeTagEnum.Set) {
    const valueTypes = getUniqueTypes(Array.from(value.values()))
    const valueType =
      valueTypes.length === 1 ? valueTypes[0] : valueTypes.join('|')
    return `Set<${valueType || 'any'}>`
  }

  if (typeTag === TypeTagEnum.WeakMap) {
    return 'WeakMap<object, any>'
  }

  if (typeTag === TypeTagEnum.WeakSet) {
    return 'WeakSet<object>'
  }

  if (typeTag === TypeTagEnum.Date) {
    return 'Date'
  }

  if (typeTag === TypeTagEnum.Array) {
    const elementTypes = getUniqueTypes(value)
    if (elementTypes.length === 1) {
      return `Array<${elementTypes[0]}>`
    }
    return `Array<${elementTypes.join('|')}>`
  }

  return typeof value
}

export default getType
