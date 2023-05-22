import { writeFileSync, readFileSync } from 'node:fs'
import path from 'path'
import camelcaseKeys from 'camelcase-keys'
import getType from '@src/utils/getType'
import prompt from '@src/libs/prompt'

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
  const transformToCamelCase = await prompt('要轉成 camelcase ?', { type: 'confirm' })
  const parseEntry = JSON.parse(readFileSync(path.join(__dirname, 'entry.json'), 'utf-8'))
  const entry = transformToCamelCase ? camelcaseKeys(parseEntry, { deep: true }) : parseEntry
  const data = generateTypeScriptType(entry)
  writeFileSync(path.join(__dirname, 'type.ts'), data)
}

main()
