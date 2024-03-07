import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import logger from '@/src/libs/logger'

const writePackageJson = (path: string, content: object) => {
  try {
    const PKG_PATH = join(path, 'package.json')
    if (!existsSync(PKG_PATH)) {
      throw 'package is not exist'
    }
    writeFileSync(PKG_PATH, JSON.stringify(content, null, 2))
  } catch (error) {
    logger.error(error)
  }
}

export default writePackageJson
