import * as esbuild from 'esbuild'
import { consola } from 'consola'
import chalk from 'chalk'
import FLAG from '../constants/flag.mjs'
import config from './config.mjs'

const main = async () => {
  const [, , flag] = process.argv
  const context = await esbuild.context(config)
  try {
    if (flag === FLAG.WATCH) {
      await context.watch()
      await consola.prompt(`Press ${chalk.cyanBright('Enter')} to quit`, { type: 'text', initial: 'quit' })
      await context.dispose()
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
