import * as dotenv from 'dotenv'
import { execSync } from 'node:child_process'
import path from 'node:path'

dotenv.config()

const ROOT = path.join(execSync(`cd ${process.env.PROJECT_ROOT_PATH} && pwd`, { encoding: 'utf-8' }).replace('\n', ''))

export default {
  ROOT,
  PKG: path.join(ROOT, 'package.json'),
  APP: path.join(ROOT, 'src/app'),
}
