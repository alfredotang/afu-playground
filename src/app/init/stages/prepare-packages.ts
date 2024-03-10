import { execSync } from 'node:child_process'

import { globSync } from 'glob'

import {
  BASE,
  ESLINT,
  PRETTIER,
  TAILWINDCSS,
  VITE,
} from '@/src/app/init/constants/imports'
import logger from '@/src/libs/logger'
import readPackageJson from '@/src/utils/read-package-json'
import writePackageJson from '@/src/utils/write-package-json'

const isTailwindConfigExist = (target: string) =>
  globSync(`${target}/tailwind.config.*`, {
    absolute: true,
    ignore: `${target}/node_modules/**`,
  }).length > 0

const rmPackageDependencies = (target: string, modules: string[]) => {
  const pkg = readPackageJson(target)
  const nodeModules = ['dependencies', 'devDependencies']
  modules.forEach(item => {
    nodeModules.forEach(nodeModule => {
      if (pkg?.[nodeModule]?.[item]) {
        delete pkg[nodeModule][item]
      }
    })
  })

  writePackageJson(target, pkg)
}

const getImportPackages = ({
  isNextJS,
  isUsingTailwindcss,
  isUsingVite,
}: {
  isNextJS: boolean
  isUsingTailwindcss: boolean
  isUsingVite: boolean
}) => {
  const eslintDeps = isNextJS ? ESLINT.NEXT : ESLINT.COMMON
  const prettierDeps = isUsingTailwindcss
    ? PRETTIER.TAILWINDCSS
    : PRETTIER.COMMON

  return {
    devDependencies: [
      ...eslintDeps,
      ...prettierDeps,
      ...(isUsingTailwindcss ? TAILWINDCSS.devDependencies : []),
      ...(isUsingVite ? VITE.devDependencies : []),
      ...BASE.devDependencies,
    ],
    dependencies: isUsingTailwindcss ? TAILWINDCSS.dependencies : [],
  }
}

export default function preparePackages({
  projectRoot,
  isNextJS,
  isUsingTailwindcss,
  isUsingVite,
}: {
  projectRoot: string
  isNextJS: boolean
  isUsingTailwindcss: boolean
  isUsingVite: boolean
}) {
  logger.info('prepare packages')
  rmPackageDependencies(projectRoot, ['eslint-plugin-react-refresh'])
  const { dependencies, devDependencies } = getImportPackages({
    isNextJS,
    isUsingTailwindcss,
    isUsingVite,
  })

  return new Promise<void>(resolve => {
    execSync(
      `cd ${projectRoot} && rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock`,
      { encoding: 'utf-8' }
    )

    if (dependencies.length) {
      execSync(`cd ${projectRoot} && pnpm add ${dependencies.join(' ')}`)
    }
    if (devDependencies.length) {
      execSync(`cd ${projectRoot} && pnpm add -D ${devDependencies.join(' ')}`)
    }

    if (isUsingTailwindcss && !isTailwindConfigExist(projectRoot)) {
      execSync(`cd ${projectRoot} && npx tailwindcss init -p`)
    }

    resolve()
  })
}
