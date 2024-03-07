import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from 'node:fs'
import path from 'node:path'
import template from 'lodash/fp/template'
import prompt from '@src/libs/prompt'
import { IKALA } from '@src/constants/path'
import pascalCase from '@src/utils/pascal-case'

const indexTemplatePath = path.join(__dirname, 'templates/index.txt')
const tsxTemplatePath = path.join(__dirname, 'templates/tsx.txt')

const creteSafeDir = (root: string, value: string) => {
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

const main = async () => {
  const ikalaProjectDirs = readdirSync(path.join(IKALA))
  const project = await prompt('專案', {
    type: 'select',
    options: ikalaProjectDirs,
  })
  const relativePath = await prompt('路徑', {
    type: 'text',
  })

  const name = await prompt('檔案名稱', {
    type: 'text',
  })

  const fileName = pascalCase(name)

  const targetPath = creteSafeDir(
    path.join(IKALA, project.toString()),
    relativePath
  )

  const indexContentTemplate = readFileSync(indexTemplatePath, 'utf-8')
  const tsxContentTemplate = readFileSync(tsxTemplatePath, 'utf-8')

  const indexContent = template(indexContentTemplate)({ name: fileName })
  const tsxContent = template(tsxContentTemplate)({ name: fileName })

  mkdirSync(path.join(targetPath, fileName))
  writeFileSync(path.join(targetPath, fileName, 'index.ts'), indexContent)
  writeFileSync(path.join(targetPath, fileName, `${fileName}.tsx`), tsxContent)
}

main()
