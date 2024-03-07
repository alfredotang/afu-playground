import { ESLINT, PRETTIER, TAILWINDCSS } from '@/src/app/init/constants/imports'
import logger from '@/src/libs/logger'
import { execSync } from 'node:child_process'

const getImportPackages = ({
  isNextJS,
  isUsingTailwindcss,
}: {
  isNextJS: boolean
  isUsingTailwindcss: boolean
}) => {
  const eslintDeps = isNextJS ? ESLINT.NEXT : ESLINT.COMMON
  const prettierDeps = isUsingTailwindcss
    ? PRETTIER.TAILWINDCSS
    : PRETTIER.TAILWINDCSS

  return {
    devDependencies: [
      ...eslintDeps,
      ...prettierDeps,
      ...(isUsingTailwindcss ? TAILWINDCSS.devDependencies : []),
    ],
    dependencies: isUsingTailwindcss ? TAILWINDCSS.dependencies : [],
  }
}

export default function preparePackages({
  projectRoot,
  isNextJS,
  isUsingTailwindcss,
}: {
  projectRoot: string
  isNextJS: boolean
  isUsingTailwindcss: boolean
}) {
  logger.info('prepare packages')
  const { dependencies, devDependencies } = getImportPackages({
    isNextJS,
    isUsingTailwindcss,
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

    if (isUsingTailwindcss) {
      execSync(`cd ${projectRoot} && npx tailwindcss init -p`)
    }

    resolve()
  })
}
