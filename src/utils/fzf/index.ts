import { spawn } from 'node:child_process'

const fzf = (value: string) =>
  new Promise<string>(resolve => {
    const child = spawn(`echo "${value}" | fzf`, {
      stdio: ['inherit', 'pipe', 'inherit'],
      shell: true,
    })
    child.stdout.setEncoding('utf-8')
    child.stdout.on('readable', function () {
      const res = child.stdout.read()

      if (res !== null) {
        resolve(res.trim())
      }
    })
  })

export default fzf
