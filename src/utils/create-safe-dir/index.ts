import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const createSafeDir = (root: string, value: string) => {
  const dirs = value.split('/').filter(Boolean)
  let currentPath = path.join(root)
  for (const dir of dirs) {
    currentPath = path.join(currentPath, dir)
    if (!existsSync(currentPath)) {
      mkdirSync(currentPath)
    }
  }

  return currentPath
}

export default createSafeDir
