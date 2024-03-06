import { execSync } from 'node:child_process'

export const currentBranch = execSync('git branch --show-current', {
  encoding: 'utf-8',
}).trim()
