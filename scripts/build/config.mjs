import { readFileSync } from 'node:fs'
import PATH from '../constants/path.mjs'
import watchPlugin from './plugins/watch.mjs'
import writeTheScripts from './plugins/write-the-scripts.mjs'
import copyFileIntoOutdir from './plugins/copy-file-into-outdir.mjs'
import { getEntryPoints } from '../utils/main.mjs'

const pkg = JSON.parse(readFileSync(PATH.PKG))

/** @type import('esbuild').BuildOptions*/
export default {
  entryPoints: getEntryPoints(),
  format: 'cjs',
  bundle: true,
  platform: 'node',
  outdir: 'dist',
  target: 'node16',
  plugins: [watchPlugin, writeTheScripts, copyFileIntoOutdir],
  minify: true,
  external: Object.keys(pkg.devDependencies), // add any external dependencies here
}
