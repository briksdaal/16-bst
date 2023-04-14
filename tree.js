import Node from './node.js';

class Tree {
  constructor(arr) {
    this.root = Tree.buildTree(arr);
  }

  static buildTree(arr) {
    const sortedNoDuplicatesArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    return Tree.buildTreeAux(sortedNoDuplicatesArr, 0, sortedNoDuplicatesArr.length - 1);
  }

  static buildTreeAux(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((end + start) / 2);

    const node = new Node(arr[mid]);

    node.left = Tree.buildTreeAux(arr, start, mid - 1);
    node.right = Tree.buildTreeAux(arr, mid + 1, end);

    return node;
  }

  static prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr2 = [];
const arr3 = [15, 3, 2, 1, 5, 13, 4, 10, 11, 7, 8, 14, 14, 14, 9, 6, 12];
const arr4 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr5 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr3);
Tree.prettyPrint(tree.root);
