import { TreeNode } from '..'

export const search = (root: TreeNode | null, val: number): TreeNode | null => {
  if (!root) return null
  if (root.val === val) return root
  if (root.val > val) return search(root.left, val)
  if (root.val < val) return search(root.right, val)
  return null
}
