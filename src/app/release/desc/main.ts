import kebabCase from 'lodash/fp/kebabCase'
import constantCase from '@src/utils/constantCase'
import { CreateIkalaGitlabAPI } from '@src/services'
import prompt from '@src/libs/prompt'
import logger from '@src/libs/logger'
import { GITLAB_PROJECT_ID } from '@src/constants/gitlab'

const main = async () => {
  const targetProject = await prompt('選擇專案', {
    type: 'select',
    options: Object.keys(GITLAB_PROJECT_ID).map(kebabCase),
  })
  const api = new CreateIkalaGitlabAPI(GITLAB_PROJECT_ID[constantCase(targetProject) as keyof typeof GITLAB_PROJECT_ID])
  try {
    const { data: milestoneList } = await api.getMilestones()
    const milestoneTitle = await prompt('選擇 milestone', {
      type: 'select',
      options: milestoneList.map(({ title }) => title),
    })

    const { data } = await api.getMergeRequestByMilestones(milestoneTitle)
    const desc = data.map(({ reference, title }) => `- ${reference} ${title}`).join('\n')
    logger.log(desc)
  } catch (error) {
    logger.error(error)
  }
}

main()
