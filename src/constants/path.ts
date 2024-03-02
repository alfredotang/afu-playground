import { execSync } from 'node:child_process'
import path from 'node:path'

export const ROOT = path.join(
  execSync(`cd ${process.env.PROJECT_ROOT_PATH} && pwd`, {
    encoding: 'utf-8',
  }).replace('\n', '')
)
export const SCRIPTS = path.join(ROOT, './scripts')

/** @deprecated */
export const IKALA = ''
