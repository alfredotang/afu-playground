import kebabCase from 'lodash/fp/kebabCase'

import { GITLAB_PROJECT_ID } from '@/src/constants/gitlab'
import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'
import { CreateIkalaGitlabAPI } from '@/src/services'
import constantCase from '@/src/utils/constant-case'

type Env = 'rc' | 'production'

const main = async () => {
  const targetEnv = (await prompt('release', {
    type: 'select',
    options: ['rc', 'production'],
  })) as Env

  const targetProject = await prompt('選擇專案', {
    type: 'select',
    options: Object.keys(GITLAB_PROJECT_ID).map(kebabCase),
  })

  const repo = constantCase(targetProject) as keyof typeof GITLAB_PROJECT_ID

  const api = new CreateIkalaGitlabAPI(GITLAB_PROJECT_ID[repo])

  try {
    const { data: milestoneList } = await api.getMilestones()
    const milestoneTitle = await prompt('選擇 milestone', {
      type: 'select',
      options: milestoneList.map(({ title }) => title),
    })

    const milestoneId =
      milestoneList.find(item => item.title === milestoneTitle)?.id || 0

    const mergeRequestParams: Record<
      Env,
      Parameters<typeof api.postMergeRequestWithMergedDescription>[0]
    > = {
      production: {
        title: milestoneTitle.replace('rc_', 'production_'),
        milestoneId,
        milestoneTitle,
        sourceBranch: 'rc',
        targetBranch: 'master',
        isReleaseToProd: true,
      },
      rc: {
        title: milestoneTitle,
        milestoneId,
        milestoneTitle,
        sourceBranch: 'staging',
        targetBranch: 'rc',
        isReleaseToProd: false,
      },
    }

    await api.postMergeRequestWithMergedDescription(
      mergeRequestParams[targetEnv]
    )
    logger.success('done')
  } catch (error) {
    logger.error(error)
  }
}

main()
