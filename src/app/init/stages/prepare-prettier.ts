import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PATH } from '@/src/app/init/constants/path'
import logger from '@/src/libs/logger'
import { execSync } from 'node:child_process'

export default async function preparePrettier({
  projectRoot,
  isESM,
  isUsingTailwindcss,
  isNextJS,
}: {
  projectRoot: string
  isUsingTailwindcss: boolean
  isESM: boolean
  isNextJS: boolean
}) {
  logger.info('prepare prettier')
  const prettierIgnore = await readFile(
    isNextJS ? PATH.prettier.ignore.next : PATH.prettier.ignore.common,
    'utf-8'
  )
  const prettier = await readFile(
    isUsingTailwindcss ? PATH.prettier.tailwindcss : PATH.prettier.common,
    'utf-8'
  )

  execSync(`cd ${projectRoot} && rm -rf .prettier*`)

  await Promise.all([
    writeFile(
      path.join(projectRoot, isESM ? '.prettierrc.cjs' : '.prettierrc.js'),
      prettier
    ),
    writeFile(path.join(projectRoot, '.prettierignore'), prettierIgnore),
  ])
}
