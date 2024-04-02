import { TreeNode } from '@/demo/tree'
import logger from '@/src/libs/logger'

import { tree as root } from '.'

export function inOrder(root: TreeNode | null) {
  if (!root) return

  inOrder(root.left)
  console.log(root.val)
  inOrder(root.right)
}

export function preOrder(root: TreeNode | null) {
  if (!root) return

  console.log(root.val)
  preOrder(root.left)
  preOrder(root.right)
}

export function postOrder(root: TreeNode | null) {
  if (!root) return

  postOrder(root.left)
  postOrder(root.right)
  console.log(root.val)
}

logger.info('In Order')
inOrder(root)

logger.info('Pre Order')
preOrder(root)

logger.info('Post Order')
postOrder(root)
