import { execSync } from 'node:child_process'
import path from 'node:path'
import { ROOT } from '@/src/constants/path'
import prompt from '@/src/libs/prompt'
import fzf from '@/src/utils/fzf'
import readPackageJson from '@/src/utils/read-package-json'
import logger from '@/src/libs/logger'

type Starter = 'vite' | 'next'

const projectDir = path.join(ROOT, '..')

const getProjectInfo = async (name: string, starter: Starter) => {
  const projectRoot = path.join(projectDir, name)
  const isESM = starter === 'vite'
  const isUsingVite = starter === 'vite'
  const isNextJS = starter === 'next'
  const isUsingTailwindcss = await prompt('using tailwindcss ?', {
    type: 'confirm',
  })

  return { isNextJS, isESM, projectRoot, isUsingTailwindcss, isUsingVite }
}

const execStarterMap: Record<Starter, (name: string) => Promise<string>> = {
  async vite(name: string) {
    execSync(`cd ${projectDir} && pnpm create vite ${name} --template=react-ts`)
    logger.success('success create vite')
    return name
  },
  async next(name: string) {
    const isUsingAppDirectory = await prompt(
      'Would you like to use App Router? (recommended)',
      {
        type: 'confirm',
      }
    )
    const isUsingAppDirectoryFlag = isUsingAppDirectory ? '--app' : '--no-app'
    execSync(
      `cd ${projectDir} && pnpm create next-app@latest ${name} --ts --src-dir --import-alias "@/*" --use-pnpm --tailwind --eslint ${isUsingAppDirectoryFlag}`
    )
    logger.success('success create next')
    return name
  },
}

export default async function prepareProjectInfo() {
  let project = ''
  const starter = await prompt('choice the starter', {
    type: 'select',
    options: ['vite', 'next'],
  })
  const isNeedToCreateNewProject = await prompt('create a new project?', {
    type: 'confirm',
  })

  if (isNeedToCreateNewProject) {
    const name = await prompt('enter the project name', {
      type: 'text',
    })

    project = await execStarterMap[starter as Starter](name.trim())
  } else {
    const projects = execSync(`cd ~/Documents/projects && ls`, {
      encoding: 'utf-8',
    })
    project = await fzf(projects)
  }

  if (!project) throw new Error('project name is required')

  const result = await getProjectInfo(project, starter as Starter)

  return result
}
