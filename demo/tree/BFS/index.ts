import { Queue } from '@/demo/queue'
import { TreeNode } from '@/demo/tree'

const root = new TreeNode(4)
root.left = new TreeNode(3)
root.left.left = new TreeNode(2)

root.right = new TreeNode(6)
root.right.left = new TreeNode(5)
root.right.right = new TreeNode(7)

export const bfs = (root: TreeNode | null) => {
  if (!root) return
  const queue = new Queue()
  queue.enqueue(root)
  let level = 0
  let current = root

  while (queue.size) {
    console.log(`Level - ${level}`)
    const size = queue.size
    for (let i = 0; i < size; i++) {
      current = queue.dequeue()
      console.log(current.val)
      if (current.left) queue.enqueue(current.left)
      if (current.right) queue.enqueue(current.right)
    }
    level++
  }
}

export const bfsWithReturn = (root: TreeNode | null) => {
  // eslint-disable-next-line prefer-const
  let res: Array<any> = []
  if (!root) return res
  const queue = new Queue()
  queue.enqueue(root)
  let level = 0
  let current = root

  while (queue.size) {
    const size = queue.size
    for (let i = 0; i < size; i++) {
      current = queue.dequeue()
      const list = res[level] || []
      list.push(current.val)
      res[level] = list
      if (current.left) queue.enqueue(current.left)
      if (current.right) queue.enqueue(current.right)
    }
    level++
  }

  return res
}

console.log(bfsWithReturn(root))
