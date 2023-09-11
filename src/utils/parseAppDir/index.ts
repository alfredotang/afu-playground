import { readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

const parseAppDir = ({ root, result, resultPath = '' }: { root: string; result: string[]; resultPath?: string }) => {
  const dirs = readdirSync(root)
  for (const dir of dirs) {
    const basePath = [resultPath, dir].filter(Boolean).join('/')
    if (existsSync(path.join(root, dir, 'main.ts'))) {
      result.push(basePath)
    } else {
      parseAppDir({ root: path.join(root, dir), result, resultPath: basePath })
    }
  }
}

export default parseAppDir
