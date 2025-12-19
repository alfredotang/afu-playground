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

function run({ cmd, path }: { cmd: string; path: string }): string {
  return execSync(cmd, { cwd: path, encoding: 'utf8' }).trim()
}

async function main() {
  const repoPath = await logger.prompt('Enter the repository path', {
    type: 'text',
    default: process.cwd(),
  })

  try {
    run({ cmd: 'git rev-parse --is-inside-work-tree', path: repoPath })
  } catch (e) {
    logger.error(`"${repoPath}" is not a valid git repository`)
    process.exit(1)
  }

  const authors = run({
    cmd: 'git log --format="%an" | sort | uniq',
    path: repoPath,
  }).split('\n')

  const results: ContributorStats[] = []

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

    results.push({
      author,
      commits: Number(commitCount),
      added,
      deleted,
      net: added + deleted,
    })
  })

  results.sort((a, b) => b.net - a.net || b.commits - a.commits)

  logger.info(`Repo: ${path.resolve(repoPath)}`)
  console.table(results)
}

main()
