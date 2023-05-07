import { readFileSync, writeFileSync } from 'node:fs'
import { consola } from 'consola'
import PATH from '../../constants/path.mjs'

/** @type import('esbuild').Plugin*/
export default {
  name: 'write-the-scripts-plugin',
  setup(build) {
    build.onEnd(result => {
      if (result.errors.length > 0) {
        consola.error(errors)
        return
      }
      const pkg = JSON.parse(readFileSync(PATH.PKG))
      const othersScripts = Object.keys(pkg.scripts)
        .filter(script => !script.startsWith('cmd'))
        .reduce((collation, script) => {
          collation[script] = pkg.scripts[script]
          return collation
        }, {})
      const cmdScripts = build.initialOptions.entryPoints.reduce((collation, entryPoint) => {
        const scriptKey = entryPoint
          .replace('src/app', 'cmd')
          .replace('/main.ts', '')
          .split('/')
          .filter(Boolean)
          .join(':')
        const scriptValue = entryPoint.replace('src/app', build.initialOptions.outdir).replace('/main.ts', '/main.js')
        collation[scriptKey] = `node ./${scriptValue}`
        return collation
      }, {})
      const newPkg = JSON.stringify({ ...pkg, scripts: { ...cmdScripts, ...othersScripts } }, null, 2)
      writeFileSync(PATH.PKG, newPkg)
      consola.success(`package.json scripts is update!`)
    })
  },
}
