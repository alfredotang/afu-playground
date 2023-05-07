import getTypeTag from '@src/utils/getTypeTag'
import { TypeTagEnum } from '@src/constants/typeTag'

type GenericObject = {
  [key: string]: any
}

const getUniqueTypes = (values: any[]): string[] => {
  return Array.from(new Set(values.map((value: any) => getType(value))))
}

function getType(value: any): string {
  if (value === undefined) {
    return 'any'
  }

  const typeTag = getTypeTag(value)

  if (typeTag === TypeTagEnum.String) {
    return 'string'
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
    const valueType = valueTypes.length === 1 ? valueTypes[0] : valueTypes.join('|')
    return `Map<${keyType}, ${valueType}>`
  }

  if (typeTag === TypeTagEnum.Set) {
    const valueTypes = getUniqueTypes(Array.from(value.values()))
    const valueType = valueTypes.length === 1 ? valueTypes[0] : valueTypes.join('|')
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

function generateTypeScriptType(obj: GenericObject): string {
  let result = 'type GeneratedType = {\n'

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const valueType = getType(obj[key])
      result += `  ${key}: ${valueType};\n`
    }
  }

  result += '};'

  return result
}

const exampleObject = {
  id: 1,
  name: 'John Doe',
  isActive: true,
  createAt: '2023-05-07T15:27:04.154Z',
  map: new Map([['hello', [1, 2, 3]]]),
  set: new Set(),
  weakMap: new WeakMap(),
  weakSet: new WeakSet(),
  arr: [1, 2, 3],
  obj: {
    arr: { key: 's', value: 2 },
  },
}

console.log(getType(exampleObject).replace('{ ', '{\n').replace('}', '\n}').replace(',', ', \n'))
// const arr: [number, string] = [1, 's']
// const map = new Map([['hello', [1, 2, 3]]])

// console.log(map)
