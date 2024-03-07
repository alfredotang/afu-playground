import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import logger from '@/src/libs/logger'

const readPackageJson = (path: string) => {
  try {
    const PKG_PATH = join(path, 'package.json')
    if (!existsSync(PKG_PATH)) {
      throw 'package is not exist'
    }
    const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8'))
    return pkg
  } catch {
    logger.error('package is not exist')
    return {}
  }
}

export default readPackageJson
