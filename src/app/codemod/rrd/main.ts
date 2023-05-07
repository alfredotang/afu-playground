import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import logger from '@src/libs/logger'
import prompt from '@src/libs/prompt'

const templatePath = path.join(__dirname, 'templates/template.txt')
const resultPath = path.join(__dirname, 'result.txt')

const data = readFileSync(templatePath, 'utf-8')
const result = data.replace(
  /<Route\s+path={(.+?)}>\s*<(.+?)\s*\/>\s*<\/Route>/g,
  '<Route path={$1} element={<$2 />} />'
)

const main = async () => {
  const does = await prompt('do?', { type: 'confirm' })
  if (!does) return
  writeFileSync(resultPath, result)
  logger.success('success!')
}

main()
