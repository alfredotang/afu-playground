import * as esbuild from 'esbuild'
import { consola } from 'consola'
import chalk from 'chalk'
import config from './config.mjs'

const main = async () => {
  const context = await esbuild.context(config)
  try {
    await context.watch()
    await consola.prompt(`Press ${chalk.cyanBright('Enter')} to quit`, { type: 'text', initial: 'quit' })
    await context.dispose()
  } catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

main()
