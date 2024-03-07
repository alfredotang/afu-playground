import { execSync } from 'node:child_process'
import path from 'node:path'

export const ROOT = path.join(
  execSync(`pwd`, {
    encoding: 'utf-8',
  }).replace('\n', '')
)
export const SCRIPTS = path.join(ROOT, './scripts')

/** @deprecated */
export const IKALA = ''
