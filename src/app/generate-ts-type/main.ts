import { writeFileSync, readFileSync } from 'node:fs'
import path from 'path'
import camelcaseKeys from 'camelcase-keys'
import getType from '@/src/utils/get-type'
import prompt from '@/src/libs/prompt'
import copyToClipboard from '@/src/utils/copy-to-clipboard'
import logger from '@/src/libs/logger'

type GenericObject = {
  [key: string]: any
}

function generateTypeScriptType(obj: GenericObject): string {
  const result = Object.entries(obj).reduce((acc, [key, value]) => {
    const typeKey = key.includes('-') ? `'${key}'` : key
    acc += `  ${typeKey}: ${getType(value)}\n`
    return acc
  }, 'type GeneratedType = {\n')

  return `${result}}`
}

const main = async () => {
  const transformToCamelCase = await prompt('要轉成 camelcase ?', {
    type: 'confirm',
  })
  const parseEntry = JSON.parse(
    readFileSync(path.join(__dirname, 'entry.json'), 'utf-8')
  )
  const entry = transformToCamelCase
    ? camelcaseKeys(parseEntry, { deep: true })
    : parseEntry
  const data = generateTypeScriptType(entry)
  writeFileSync(path.join(__dirname, 'type.ts'), data)
  await copyToClipboard(data)
  logger.success('copied!')
}

main()
