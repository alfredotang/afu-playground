import axios, { AxiosInstance } from 'axios'
import type { Milestone, MergeRequest, Branch } from './type'
import snakecaseKeys from 'snakecase-keys'
import pickBy from 'lodash/fp/pickBy'
import pipe from 'lodash/fp/pipe'
import logger from '@src/libs/logger'
import prompt from '@src/libs/prompt'

export * from './type'


export class CreateIkalaGitlabAPI {
  private _projectId: number
  private _instance: AxiosInstance

  constructor(projectId: number) {
    this._projectId = projectId
    this._instance = axios.create({
      baseURL: `${process.env.GITLAB_API_URL}/projects/${this._projectId}`,
      headers: {
        'PRIVATE-TOKEN': process.env.GITLAB_API_TOKEN,
      },
    })
  }

  public getMilestones() {
    return this._instance.get<Array<Milestone>>('/milestones?sort=created_at')
  }

  public getMergeRequestByMilestones(milestoneTitle: string) {
    return this._instance.get<Array<MergeRequest>>(
      `/merge_requests?page=1&per_page=1000&state=merged&milestone=${milestoneTitle}`
    )
  }

  public async getMergeRequestDescriptionByMilestones(milestoneTitle: string) {
    const { data } = await this.getMergeRequestByMilestones(milestoneTitle)
    const desc = data.map(({ reference, title }) => `- ${reference} ${title}`).join('\n')
    return `${desc}\n\n@austin.chang @jinze.huang @alfredo.tang`
  }

  public postMergeRequest(params: {
    sourceBranch: Branch
    targetBranch: Branch
    title: string
    milestoneId?: number
    description: string
  }) {
    const body = pipe(pickBy(Boolean), snakecaseKeys)(params)
    return this._instance.post('/merge_requests', body)
  }

  public async postMergeRequestWithMergedDescription({
    title,
    milestoneTitle,
    milestoneId,
    sourceBranch,
    targetBranch,
  }: {
    milestoneTitle: string
    title: string
    milestoneId: number
    sourceBranch: Branch
    targetBranch: Branch
  }) {
    const description = await this.getMergeRequestDescriptionByMilestones(milestoneTitle)
    logger.log(description)
    const sure = await prompt('是否要發送 MR?', {
      type: 'confirm',
    })
    if (!sure) {
      logger.info('cancel')
      return
    }
    await this.postMergeRequest({
      sourceBranch,
      targetBranch,
      title,
      description,
      milestoneId,
    })
  }
}
