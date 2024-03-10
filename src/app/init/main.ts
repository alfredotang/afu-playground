import {
  prepareEslint,
  preparePackages,
  preparePrettier,
  prepareProjectInfo,
  prepareVscodeSettings,
} from './stages'

const main = async () => {
  const { projectRoot, isESM, isNextJS, isUsingTailwindcss, isUsingVite } =
    await prepareProjectInfo()

  await preparePackages({
    projectRoot,
    isNextJS,
    isUsingTailwindcss,
    isUsingVite,
  })

  await Promise.all([
    prepareEslint({ projectRoot, isNextJS, isESM }),
    preparePrettier({ projectRoot, isUsingTailwindcss, isESM, isNextJS }),
    prepareVscodeSettings({ projectRoot, isUsingTailwindcss }),
  ])
}

main()
