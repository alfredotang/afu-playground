import { execSync } from 'node:child_process'

import logger from '@/src/libs/logger'

let [, , file = '.log/main.ts'] = process.argv
file = file.endsWith('.ts') ? file : `${file}/index.ts`

logger.info(`Watching ${file}`)

execSync(`tsx --watch ${file}`, { stdio: 'inherit' })
