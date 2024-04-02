import { TreeNode } from '@/demo/tree'

export const tree = new TreeNode(4)
tree.left = new TreeNode(2)
tree.left.right = new TreeNode(3)
tree.left.left = new TreeNode(1)

tree.right = new TreeNode(6)
tree.right.left = new TreeNode(5)
tree.right.right = new TreeNode(7)
