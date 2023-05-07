import { writeFileSync, readFileSync } from 'node:fs'
import path from 'path'
import getType from '@src/utils/getType'

type GenericObject = {
  [key: string]: any
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

const main = async () => {
  const entry = JSON.parse(readFileSync(path.join(__dirname, 'entry.json'), 'utf-8'))
  const data = generateTypeScriptType(entry)
  writeFileSync(path.join(__dirname, 'type.ts'), data)
}

main()
