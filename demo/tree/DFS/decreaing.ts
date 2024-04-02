import { TreeNode } from '@/demo/tree'
import logger from '@/src/libs/logger'

import { tree as root } from '.'

export function inOrder(root: TreeNode | null) {
  if (!root) return

  inOrder(root.right)
  console.log(root.val)
  inOrder(root.left)
}

export function preOrder(root: TreeNode | null) {
  if (!root) return

  console.log(root.val)
  preOrder(root.right)
  preOrder(root.left)
}

export function postOrder(root: TreeNode | null) {
  if (!root) return

  postOrder(root.right)
  postOrder(root.left)
  console.log(root.val)
}

logger.info('In Order')
inOrder(root)

logger.info('Pre Order')
preOrder(root)

logger.info('Post Order')
postOrder(root)
