import { readFileSync } from 'node:fs'
import PATH from '../constants/path.mjs'
import watchPlugin from './plugins/watch.mjs'
import writeTheScripts from './plugins/write-the-scripts.mjs'
import copyTxtIntoOutdir from './plugins/copy-txt-into-outdir.mjs'
import { getEntryPoints } from '../utils/main.mjs'

const pkg = JSON.parse(readFileSync(PATH.PKG))

const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]

/** @type import('esbuild').BuildOptions*/
export default {
  entryPoints: getEntryPoints(),
  format: 'cjs',
  bundle: true,
  platform: 'node',
  outdir: 'app',
  target: 'node16',
  plugins: [watchPlugin, writeTheScripts, copyTxtIntoOutdir],
  minify: true,
  external, // add any external dependencies here
}
