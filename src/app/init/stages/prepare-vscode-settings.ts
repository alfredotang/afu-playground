import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PATH } from '@src/app/init/constants/path'
import logger from '@src/libs/logger'
import { execSync } from 'node:child_process'

export default async function prepareVscodeSettings({
  projectRoot,
  isUsingTailwindcss,
}: {
  projectRoot: string
  isUsingTailwindcss: boolean
}) {
  logger.info('prepare vscode settings')
  const vscodeSettings = await readFile(
    isUsingTailwindcss ? PATH.vscode.tailwindcss : PATH.vscode.common,
    'utf-8'
  )

  execSync(`cd ${projectRoot} && rm -rf .vscode && mkdir .vscode`)

  await writeFile(
    path.join(projectRoot, '.vscode', 'settings.json'),
    vscodeSettings
  )
}
