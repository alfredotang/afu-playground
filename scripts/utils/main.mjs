import path from 'node:path'
import { readdirSync, existsSync } from 'node:fs'
import PATH from '../constants/path.mjs'

export const getDurationTime = time => {
  if (time < 1000) return `${time}ms`
  if (time >= 1000 && time < 1000 * 60) return `${Math.floor(time / 1000)}s`
  return `${Math.floor(time / (1000 * 60))} mins`
}

export const parseAppDir = (root, result = [], resultPath = '') => {
  const dirs = readdirSync(root)
  for (const dir of dirs) {
    if (existsSync(path.join(root, dir, 'main.ts'))) {
      result.push(`${resultPath}/${dir}/main.ts`)
    } else {
      parseAppDir(path.join(root, dir), result, `${resultPath}/${dir}`)
    }
  }
}

export const getEntryPoints = () => {
  const entryPoints = []
  parseAppDir(PATH.APP, entryPoints, 'src/app')
  return entryPoints
}
