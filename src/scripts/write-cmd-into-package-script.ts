import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { ROOT } from '@/src/constants/path'
import parseAppDir from '@/src/utils/parse-app-dir'
import logger from '@/src/libs/logger'

const PKG_PATH = path.join(ROOT, 'package.json')
const APP_PATH = path.join(ROOT, 'src/app')

const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8'))

const getEntryPoints = () => {
  const result: string[] = []
  parseAppDir({ root: APP_PATH, result })
  return result
  // .map(item => item.split('/').join(':'))
}

const entryPoints = getEntryPoints()

const othersScripts = Object.keys(pkg.scripts)
  .filter(script => !script.startsWith('cmd'))
  .reduce<Record<string, string>>((collation, script) => {
    collation[script] = pkg.scripts[script]
    return collation
  }, {})

const cmdScripts = entryPoints.reduce<Record<string, string>>(
  (collation, entryPoint) => {
    const scriptKey =
      entryPoint === 'cmd'
        ? entryPoint
        : `cmd:${entryPoint.split('/').filter(Boolean).join(':')}`
    collation[scriptKey] = `bun src/app/${entryPoint}/main.ts`
    return collation
  },
  {}
)

const newPkg = JSON.stringify(
  { ...pkg, scripts: { ...cmdScripts, ...othersScripts } },
  null,
  2
)

writeFileSync(PKG_PATH, newPkg)

logger.success(`package.json scripts is update!`)
