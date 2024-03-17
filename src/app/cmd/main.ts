import { spawn } from 'node:child_process'

import { ROOT } from '@/src/constants/path'
import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'
import readPackageJson from '@/src/utils/read-package-json'

const getCommands = () => {
  const { scripts } = readPackageJson(ROOT)
  const result = Object.keys(scripts).filter(script => script.startsWith('cmd'))
  return result
}

const main = async () => {
  const commands = getCommands()
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
