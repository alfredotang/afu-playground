import { execSync } from 'node:child_process'

import logger from '@/src/libs/logger'

const [, , file = '.log/main.ts'] = process.argv

logger.info(`Watching ${file}`)

execSync(`bun --watch ${file}`, { stdio: 'inherit' })
