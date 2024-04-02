import { TreeNode } from '..'

export const insert = (root: TreeNode | null, val: number): TreeNode => {
  if (!root) return new TreeNode(val)
  if (root.val > val) root.left = insert(root.left, val)
  if (root.val < val) root.right = insert(root.right, val)
  return root
}
