import { TreeNode } from '..'

export const remove = (root: TreeNode | null, val: number): TreeNode | null => {
  if (!root) return null
  if (root.val > val) {
    root.left = remove(root.left, val)
  } else if (root.val < val) {
    root.right = remove(root.right, val)
  } else {
    if (!root.left) return root.right // only right child
    if (!root.right) return root.left // only left child

    /**
     * If the node has two children, we find the minimum node in the right subtree.
     */
    const min = findMin(root.right)

    /**
     * Then we replace the value of the node
     */
    root.val = min.val

    /**
     * Finally, we remove the minimum node in the right subtree.
     */
    root.right = remove(root.right, min.val)
  }
  return root
}

const findMin = (root: TreeNode | null): TreeNode => {
  while (root?.left) {
    root = root.left
  }
  return root as TreeNode
}
