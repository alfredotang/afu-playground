import { readFileSync, writeFileSync } from 'node:fs'

import camelcaseKeys from 'camelcase-keys'
import path from 'path'

import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'
import copyToClipboard from '@/src/utils/copy-to-clipboard'
import getType from '@/src/utils/get-type'

type GenericObject = {
  [key: string]: any
}

function generateTypeScriptType(obj: GenericObject): string {
  const result = Object.entries(obj).reduce((acc, [key, value]) => {
    const typeKey = key.includes('-') ? `'${key}'` : key
    acc += `  ${typeKey}: ${getType(value)}\n`
    return acc
  }, 'export type GeneratedType = {\n')

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
