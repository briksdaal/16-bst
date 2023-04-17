import Tree from './tree.js';

function createRandomArray() {
  return new Array(Math.floor(Math.random() * 10 + 1))
    .fill()
    .map(() => Math.floor(Math.random() * 100));
}

// driver code
// 1. Create a binary search tree from an array of random numbers.
const tree = new Tree(createRandomArray());
Tree.prettyPrint(tree.root);
// 2. Confirm that the tree is balanced by calling isBalanced
console.log(tree.isBalanced());
// 3. Print out all elements in level, pre, post, and in order
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
// 4. Unbalance the tree by adding several numbers > 100
tree.insert(Math.floor(Math.random() * 100 + 100));
tree.insert(Math.floor(Math.random() * 100 + 100));
tree.insert(Math.floor(Math.random() * 100 + 100));
// 5. Confirm that the tree is unbalanced by calling isBalanced
console.log(tree.isBalanced());
// 6. Balance the tree by calling rebalance
tree.rebalance();
// 7. Confirm that the tree is balanced by calling isBalanced
console.log(tree.isBalanced());
// 8. Print out all elements in level, pre, post, and in order
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
