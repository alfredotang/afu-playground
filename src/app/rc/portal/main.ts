import { CreateIkalaGitlabAPI } from '@src/services'
import prompt from '@src/libs/prompt'
import logger from '@src/libs/logger'
import cancelTheProcess from '@src/utils/cancelTheProcess'
import { GITLAB_PROJECT_ID } from '@src/constants/gitlab'

const api = new CreateIkalaGitlabAPI(GITLAB_PROJECT_ID.PORTAL)

const main = async () => {
  try {
    const { data: milestoneList } = await api.getMilestones()
    const milestoneTitle = (await prompt('選擇 milestone', {
      type: 'select',
      options: milestoneList.map(({ title }) => title),
    })) as unknown as string

    if (cancelTheProcess(milestoneTitle)) return

    const milestoneId = milestoneList.find(item => item.title === milestoneTitle)?.id || 0
    const title = await prompt('輸入 mr title', {
      type: 'text',
      initial: milestoneTitle,
    })
    if (cancelTheProcess(title)) return
    if (!title) throw 'title 必填'
    await api.postMergeRequestWithMergedDescription({
      title,
      milestoneTitle,
      milestoneId,
      sourceBranch: 'staging',
      targetBranch: 'rc',
    })
    logger.success('done')
  } catch (error) {
    logger.error(error)
  }
}

main()
