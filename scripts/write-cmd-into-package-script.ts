import path from 'node:path'

import { ROOT } from '@/src/constants/path'
import logger from '@/src/libs/logger'
import parseAppDir from '@/src/utils/parse-app-dir'
import readPackageJson from '@/src/utils/read-package-json'
import writePackageJson from '@/src/utils/write-package-json'

const APP_PATH = path.join(ROOT, 'src/app')

const pkg = readPackageJson(ROOT)

const entryPoints = parseAppDir(APP_PATH)

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
    collation[scriptKey] = `bun --bun src/app/${entryPoint}/main.ts`
    return collation
  },
  {}
)

writePackageJson(ROOT, { ...pkg, scripts: { ...cmdScripts, ...othersScripts } })

logger.success(`package.json scripts is update!`)
