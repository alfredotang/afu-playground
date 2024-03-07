import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import prompt from '@/src/libs/prompt'
import { ROOT } from '@/src/constants/path'
import {
  prepareEslint,
  preparePackages,
  preparePrettier,
  prepareVscodeSettings,
} from './stages'
import fzf from '@/src/utils/fzf'

const projects = execSync(`cd ~/Documents/projects && ls`, {
  encoding: 'utf-8',
})

const getProjectInfo = (project: string) => {
  const projectRoot = path.join(ROOT, '..', project)
  const pkg = JSON.parse(
    readFileSync(path.join(projectRoot, 'package.json'), {
      encoding: 'utf-8',
    })
  )
  const isESM = pkg?.type === 'module'
  const isNextJS = Boolean(pkg?.dependencies?.next)

  return { isNextJS, isESM, projectRoot }
}

const main = async () => {
  const project = await fzf(projects)
  const isUsingTailwindcss = await prompt('using tailwindcss ?', {
    type: 'confirm',
  })

  const { isESM, isNextJS, projectRoot } = getProjectInfo(project)

  await preparePackages({ projectRoot, isNextJS, isUsingTailwindcss })

  await Promise.all([
    prepareEslint({ projectRoot, isNextJS, isESM }),
    preparePrettier({ projectRoot, isUsingTailwindcss, isESM }),
    prepareVscodeSettings({ projectRoot, isUsingTailwindcss }),
  ])
}

main()
