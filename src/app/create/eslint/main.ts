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

const nextTemplatePath = path.join(__dirname, 'templates/next.txt')
const viteTemplatePath = path.join(__dirname, 'templates/vite.txt')
const workspaceRoot = path.resolve('~/Documents/projects')
const projects = existsSync(`cd ${workspaceRoot}  && ls`)

const main = async () => {
  console.log(projects)
  // const ikalaProjectDirs = readdirSync(path.join(''))
  // const project = await prompt('專案', {
  //   type: 'text',
  // })

  // const projectRoot = path.resolve('~/Documents/projects', project)

  // const indexContentTemplate = readFileSync(indexTemplatePath, 'utf-8')
  // const tsxContentTemplate = readFileSync(tsxTemplatePath, 'utf-8')

  // const indexContent = template(indexContentTemplate)({ name: fileName })
  // const tsxContent = template(tsxContentTemplate)({ name: fileName })

  // mkdirSync(path.join(targetPath, fileName))
  // writeFileSync(path.join(targetPath, fileName, 'index.ts'), indexContent)
  // writeFileSync(path.join(targetPath, fileName, `${fileName}.tsx`), tsxContent)
}

main()
