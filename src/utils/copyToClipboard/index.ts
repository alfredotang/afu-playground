import { spawn } from 'node:child_process'

const copyToClipboard = (text: string) =>
  new Promise<void>(resolve => {
    const copyProcess = spawn('pbcopy')
    copyProcess.stdin.write(text)
    copyProcess.stdin.end()
    resolve()
  })

export default copyToClipboard
