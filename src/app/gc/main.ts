import { execSync } from 'child_process'
import path from 'node:path'
import logger from '@/src/libs/logger'

type ContributorStats = {
  author: string
  commits: number
  added: number
  deleted: number
  net: number
}

const AUTHOR_DICT: Record<string, string> = {
  'Alfredo Tang': 'Alfredo Tang',
  'PINGYU CHIANG': 'Ben Chiang',
  'Bill Lee': 'Bill Lee',
  'Fred Jhang': 'Fred Jhang',
  'Ben Chiang': 'Ben Chiang',
  'Teresa Hsieh': 'Teresa Hsieh',
  'Chris Wang': 'Chris Wang',
}

function run({ cmd, path }: { cmd: string; path: string }): string {
  return execSync(cmd, { cwd: path, encoding: 'utf8' }).trim()
}

async function getRepoPath() {
  const repoPathFromArgs = process.argv[2]
  if (repoPathFromArgs) {
    return repoPathFromArgs
  }
  return await logger.prompt('Enter the repository path', {
    type: 'text',
    default: process.cwd(),
  })
}

async function main() {
  const repoPath = await getRepoPath()

  try {
    run({ cmd: 'git rev-parse --is-inside-work-tree', path: repoPath })
  } catch (e) {
    logger.error(`"${repoPath}" is not a valid git repository`)
    process.exit(1)
  }

  const isFrontendYorozuya = repoPath.includes('frontend-yorozuya')

  const authors = run({
    cmd: 'git log --format="%an" | sort | uniq',
    path: repoPath,
  }).split('\n')

  const data: ContributorStats[] = []

  authors.forEach(author => {
    const commitCount = run({
      cmd: `git log --author="${author}" --pretty=oneline | wc -l`,
      path: repoPath,
    })

    const stat = run({
      cmd: `git log --author="${author}" --pretty=tformat: --numstat`,
      path: repoPath,
    })
      .split('\n')
      .filter(Boolean)

    let added = 0
    let deleted = 0

    stat.forEach(line => {
      const parts = line.split('\t')
      if (parts.length >= 2) {
        added += parseInt(parts[0]) || 0
        deleted += parseInt(parts[1]) || 0
      }
    })

    data.push({
      author,
      commits: Number(commitCount),
      added,
      deleted,
      net: added + deleted,
    })
  })

  const grouped: Record<string, ContributorStats> = {}

  for (const stat of data) {
    const groupAuthor = AUTHOR_DICT[stat.author] || stat.author
    if (!grouped[groupAuthor]) {
      grouped[groupAuthor] = {
        author: groupAuthor,
        commits: 0,
        added: 0,
        deleted: 0,
        net: 0,
      }
    }
    grouped[groupAuthor].commits += stat.commits
    grouped[groupAuthor].added += stat.added
    grouped[groupAuthor].deleted += stat.deleted
    grouped[groupAuthor].net += stat.net
  }

  const results = Object.values(grouped).map(result => {
    if (result.author === AUTHOR_DICT['Ben Chiang'] && isFrontendYorozuya) {
      const comfyAdded = 381304 - 500
      result.added -= comfyAdded
      result.net -= comfyAdded
    }
    return result
  })

  results.sort((a, b) => b.net - a.net || b.commits - a.commits)

  logger.info(`Repo: ${path.resolve(repoPath)}`)
  console.table(results)
}

main()
