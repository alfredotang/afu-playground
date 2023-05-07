import { statSync, readdirSync, copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { consola } from 'consola'

const copyFiles = (entryPoint, outdir) => {
  readdirSync(entryPoint).forEach(file => {
    const filePath = path.join(entryPoint, file)
    const entryPointDir = entryPoint.replace('src/app/', '')

    if (path.extname(file) === '.txt' || path.extname(file) === '.json') {
      const destPath = path.join(outdir, entryPointDir, file)
      copyFileSync(filePath, destPath)
    }

    if (statSync(filePath).isDirectory()) {
      const subDir = path.join(entryPoint, file)
      mkdirSync(path.join(outdir, entryPointDir, file), { recursive: true })
      copyFiles(subDir, outdir)
    }
  })
}

/** @type import('esbuild').Plugin*/
export default {
  name: 'copy-file-into-outdir-plugin',
  setup(build) {
    build.onEnd(result => {
      if (result.errors.length > 0) {
        consola.error(errors)
        return
      }

      build.initialOptions.entryPoints.forEach(entryPoint => {
        copyFiles(entryPoint.replace('/main.ts', ''), build.initialOptions.outdir)
      })

      consola.success(`Copy .txt files completed!`)
    })
  },
}
