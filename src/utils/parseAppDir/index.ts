import { readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

type ReaddirSyncParams = Parameters<typeof readdirSync>

const readDirSafeSync = (path: ReaddirSyncParams[0]) => {
  try {
    const dirs = readdirSync(path)
    return dirs
  } catch {
    return null
  }
}

const parseAppDir = ({ root, result, resultPath = '' }: { root: string; result: string[]; resultPath?: string }) => {
  const dirs = readDirSafeSync(root)
  if (!dirs?.length) return
  for (const dir of dirs) {
    const basePath = [resultPath, dir].filter(Boolean).join('/')
    if (existsSync(path.join(root, dir, 'main.ts'))) {
      result.push(basePath)
    }
    parseAppDir({ root: path.join(root, dir), result, resultPath: basePath })
  }
}

export default parseAppDir
