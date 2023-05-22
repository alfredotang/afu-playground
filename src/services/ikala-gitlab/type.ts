export type Branch = 'rc' | 'master' | 'staging'

export interface Milestone {
  id: number
  iid: number
  project_id: number
  title: string
  description: string
  state: string
  created_at: string
  updated_at: string
  due_date: string | null
  start_date: string | null
  expired: boolean
  web_url: string
}

export interface MergeRequest {
  id: number
  iid: number
  project_id: number
  title: string
  description: string
  state: string
  created_at: string
  updated_at: string
  merged_by: { id: number; username: string; name: string; state: string; avatar_url: string; web_url: string }
  merge_user: { id: number; username: string; name: string; state: string; avatar_url: string; web_url: string }
  merged_at: string
  closed_by: string | null
  closed_at: string | null
  target_branch: string
  source_branch: string
  user_notes_count: number
  upvotes: number
  downvotes: number
  author: { id: number; username: string; name: string; state: string; avatar_url: string; web_url: string }
  assignees: Array<{ id: number; username: string; name: string; state: string; avatar_url: string; web_url: string }>
  assignee: { id: number; username: string; name: string; state: string; avatar_url: string; web_url: string }
  reviewers: Array<string>
  source_project_id: number
  target_project_id: number
  labels: Array<string>
  draft: boolean
  work_in_progress: boolean
  milestone: {
    id: number
    iid: number
    project_id: number
    title: string
    description: string
    state: string
    created_at: string
    updated_at: string
    due_date: string | null
    start_date: string | null
    expired: boolean
    web_url: string
  }
  merge_when_pipeline_succeeds: boolean
  merge_status: string
  detailed_merge_status: string
  sha: string
  merge_commit_sha: string
  squash_commit_sha: string | null
  discussion_locked: string | null
  should_remove_source_branch: boolean
  force_remove_source_branch: boolean
  reference: string
  references: { short: string; relative: string; full: string }
  web_url: string
  time_stats: {
    time_estimate: number
    total_time_spent: number
    human_time_estimate: string | null
    human_total_time_spent: string | null
  }
  squash: boolean
  squash_on_merge: boolean
  task_completion_status: { count: number; completed_count: number }
  has_conflicts: boolean
  blocking_discussions_resolved: boolean
}
