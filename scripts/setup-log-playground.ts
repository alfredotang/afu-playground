import { execSync } from 'node:child_process'
import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { ROOT } from '@/src/constants/path'
import creteSafeDir from '@/src/utils/create-safe-dir'

const playgroundPath = path.join(ROOT, '.log', 'main.ts')

const isLogPlaygroundExist = existsSync(playgroundPath)

if (!isLogPlaygroundExist) {
  creteSafeDir(ROOT, '.log')
  execSync('touch .log/main.ts')
  writeFileSync(playgroundPath, `console.log('hello')`, 'utf-8')
}
