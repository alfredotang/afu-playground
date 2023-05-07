import { execSync } from 'node:child_process'
import dayjs from 'dayjs'
import chalk from 'chalk'
import { consola } from 'consola'
import { getDurationTime } from '../../utils/main.mjs'
import FLAG from '../../constants/flag.mjs'

/** @type import('esbuild').Plugin*/
export default {
  name: 'watch-plugin',
  setup(build) {
    const [, , flag] = process.argv
    const durationTime = new Date()
    let startTime = new Date()
    build.onStart(() => {
      execSync('rm -rf app')
      consola.start(`Build starting`)
      startTime = new Date()
    })

    build.onEnd(result => {
      if (result.errors.length > 0) {
        consola.error(`Build finished with errors`)
        consola.error(errors)
        return
      }

      consola.success(`successfully`)
      const durations = dayjs(new Date()).diff(startTime, 'milliseconds')
      consola.info(`builded with ${chalk.cyanBright(getDurationTime(durations))}`)
    })

    build.onDispose(() => {
      if (flag !== FLAG.WATCH) return
      const durations = dayjs(new Date()).diff(durationTime, 'milliseconds')
      consola.info(`watched with ${chalk.cyanBright(getDurationTime(durations))}`)
    })
  },
}
