import { spawn } from 'node:child_process'
import dayjs from 'dayjs'
import chalk from 'chalk'
import { consola } from 'consola'
import boxen from 'boxen'
import { getDurationTime } from '../../utils/main.mjs'

/** @type import('esbuild').Plugin*/
export default {
  name: 'restart-log-server-plugin',
  setup(build) {
    const durationTime = new Date()
    let child = null
    build.onStart(() => {
      console.log(boxen('build start', { padding: 1, borderColor: 'cyanBright' }))
      child?.kill()
    })

    build.onEnd(result => {
      if (result.errors.length > 0) {
        consola.error(`Build finished with errors`)
        consola.error(errors)
        return
      }

      child = spawn('node', ['./.log/main.js'], { stdio: 'inherit' })
    })

    build.onDispose(() => {
      const durations = dayjs(new Date()).diff(durationTime, 'milliseconds')
      consola.info(`watched with ${chalk.cyanBright(getDurationTime(durations))}`)
    })
  },
}
