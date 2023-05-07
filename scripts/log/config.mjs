import { readFileSync } from 'node:fs'
import PATH from '../constants/path.mjs'
import restartLogServer from './plugins/reStartLogServer.mjs'

const pkg = JSON.parse(readFileSync(PATH.PKG))

const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]

/** @type import('esbuild').BuildOptions*/
export default {
  entryPoints: ['log/main.ts'],
  format: 'cjs',
  bundle: true,
  platform: 'node',
  outdir: 'log',
  target: 'node16',
  plugins: [restartLogServer],
  minify: true,
  external, // add any external dependencies here
}
