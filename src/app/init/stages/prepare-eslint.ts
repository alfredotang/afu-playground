import { execSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { PATH } from '@/src/app/init/constants/path'
import logger from '@/src/libs/logger'

export default async function prepareEslint({
  projectRoot,
  isESM,
  isNextJS,
}: {
  projectRoot: string
  isNextJS: boolean
  isESM: boolean
}) {
  logger.info('prepare eslint')
  const eslintIgnore = await readFile(
    isNextJS ? PATH.eslint.ignore.next : PATH.eslint.ignore.common,
    'utf-8'
  )
  const eslint = await readFile(
    isNextJS ? PATH.eslint.next : PATH.eslint.common,
    'utf-8'
  )
  execSync(`cd ${projectRoot} && rm -rf .eslint*`)

  await Promise.all([
    writeFile(
      path.join(projectRoot, isESM ? '.eslintrc.cjs' : '.eslintrc.js'),
      eslint
    ),
    writeFile(path.join(projectRoot, '.eslintignore'), eslintIgnore),
  ])
}
