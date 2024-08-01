import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

type ReaddirSyncParams = Parameters<typeof readdirSync>

type Options = {
  root: string
  result: string[]
  resultPath?: string
}

const readDirSafeSync = (path: ReaddirSyncParams[0]) => {
  try {
    const dirs = readdirSync(path)
    return dirs
  } catch {
    return null
  }
}

const handler = ({ root, result, resultPath = '' }: Options) => {
  const dirs = readDirSafeSync(root)?.filter(name => name !== 'deprecated')
  if (!dirs?.length) return
  for (const dir of dirs) {
    const basePath = [resultPath, dir].filter(Boolean).join('/')
    if (existsSync(path.join(root, dir, 'main.ts'))) {
      result.push(basePath)
    }
    handler({ root: path.join(root, dir), result, resultPath: basePath })
  }
}
const parseAppDir = (root: string) => {
  const result: string[] = []
  handler({ root, result })
  return result
}

export default parseAppDir
