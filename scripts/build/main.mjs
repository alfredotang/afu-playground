import * as esbuild from 'esbuild'
import { consola } from 'consola'
import FLAG from '../constants/flag.mjs'
import config from './config.mjs'

const main = async () => {
  const [, , flag] = process.argv
  const context = await esbuild.context(config)
  try {
    if (flag === FLAG.WATCH) {
      await context.watch()
      process.on('SIGINT', () => {
        consola.info('quit')
        context.dispose()
      })
    } else {
      await context.rebuild()
      await context.dispose()
    }
  } catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

main()
