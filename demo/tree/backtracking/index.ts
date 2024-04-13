import { TreeNode } from '@/demo/tree'

const root = new TreeNode(4)
root.left = new TreeNode(2)
root.left.left = new TreeNode(0)

root.right = new TreeNode(6)
root.right.left = new TreeNode(5)
root.right.right = new TreeNode(0)

function canReachLeaf(root: TreeNode | null): boolean {
  if (!root?.val) return false
  if (!root.left && !root.right) return true

  if (canReachLeaf(root.left)) return true
  if (canReachLeaf(root.right)) return true
  return false
}

function leafPath(root: TreeNode | null, path: any[] = []) {
  if (!root?.val) return false
  path.push(root.val)

  if (!root.left && !root.right) return true

  if (leafPath(root.left, path)) return true
  if (leafPath(root.right, path)) return true

  path.pop()
  return false
}

const list: any[] = []
console.log(canReachLeaf(root), leafPath(root, list), list)
