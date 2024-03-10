import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { ROOT } from '@/src/constants/path'
import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'

const fetchCommandDict = (): Promise<string[]> =>
  new Promise(resolve => {
    const { scripts } = JSON.parse(
      readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
    )
    const result = Object.keys(scripts).filter(script =>
      script.startsWith('cmd')
    )
    resolve(result)
  })

const main = async () => {
  const commands = await fetchCommandDict()
  const command = await prompt('選擇要執行的 cmd', {
    type: 'select',
    name: 'command',
    options: commands,
  })

  logger.start('start to child process')

  const child = spawn(`pnpm`, ['run', command.toString()], { stdio: 'inherit' })

  child.on('close', () => {
    logger.info(`finished ${command} process`)
  })

  process.on('exit', () => {
    child.kill()
  })
}

main()
