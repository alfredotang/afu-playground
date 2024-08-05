import axios, { AxiosInstance } from 'axios'
import pickBy from 'lodash/fp/pickBy'
import pipe from 'lodash/fp/pipe'
import snakecaseKeys from 'snakecase-keys'

import { GITLAB_API_URL, IKALA_TEAM_GROUP } from '@/src/constants/gitlab'
import logger from '@/src/libs/logger'
import prompt from '@/src/libs/prompt'

import type { Branch, MergeRequest, Milestone } from './type'

export * from './type'

/**
 * @deprecated
 */
export class CreateIkalaGitlabAPI {
  private _projectId: number
  private _instance: AxiosInstance

  constructor(projectId: number) {
    this._projectId = projectId
    this._instance = axios.create({
      baseURL: `${GITLAB_API_URL}/projects/${this._projectId}`,
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

  public async getMergeRequestDescriptionByMilestones(
    milestoneTitle: string,
    isReleaseToProd?: boolean
  ) {
    const { data } = await this.getMergeRequestByMilestones(milestoneTitle)
    const desc = data
      .map(({ reference, title }) => `- ${reference} ${title}`)
      .join('\n')
    return [
      `## Change logs\n\n${desc}`,
      `## Reviewer\n\n${IKALA_TEAM_GROUP.FE.join('\t')}`,
      isReleaseToProd
        ? `## SRE Reviewer\n\n${IKALA_TEAM_GROUP.SRE.join('\t')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n')
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
    isReleaseToProd,
  }: {
    milestoneTitle: string
    title: string
    milestoneId: number
    sourceBranch: Branch
    targetBranch: Branch
    isReleaseToProd?: boolean
  }) {
    const description = await this.getMergeRequestDescriptionByMilestones(
      milestoneTitle,
      isReleaseToProd
    )
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
