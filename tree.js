import Node from './node.js';

class Tree {
  constructor(arr) {
    this.root = Tree.buildTree(arr);
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let prev = null;
    let current = this.root;

    while (current !== null) {
      if (current.data === value) {
        console.log('Duplicate identified - not added');
        return;
      }
      prev = current;
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      }
    }

    if (prev.data > value) {
      prev.left = newNode;
    } else {
      prev.right = newNode;
    }
  }

  delete(value) {
    this.deleteAux(value, this.root);
  }

  deleteAux(value, root) {
    let prev = null;
    let current = root;

    // find node to be deleted
    while (current !== null) {
      if (current.data > value) {
        prev = current;
        current = current.left;
      } else if (current.data < value) {
        prev = current;
        current = current.right;
      } else {
        break;
      }
    }

    if (current === null) {
      // value not found in tree
      return;
    }

    // found node to be deleted
    if (!(current.left !== null && current.right !== null)) {
      // doesn't have two children
      let newChild;
      if (current.left === null && current.right === null) {
        // no children
        newChild = null;
      } else if (current.left !== null || current.right === null) {
        // only child is left
        newChild = current.left;
      } else if (current.left === null || current.right !== null) {
        // only child is right
        newChild = current.right;
      }
      // update root or parent's child
      if (this.root === current) {
        this.root = newChild;
      } else if (prev.left === current) {
        prev.left = newChild;
      } else {
        prev.right = newChild;
      }
    } else {
      // two children
      // find successor
      let succ = current.right;
      let prevSucc = current;

      while (succ.left !== null) {
        prevSucc = succ;
        succ = succ.left;
      }

      // delete successor
      this.deleteAux(succ.data, prevSucc);

      // replace data to be deleted with successor data
      current.data = succ.data;
    }
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
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
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
tree.delete(14);
// tree.delete(324);
// tree.delete(6345);
// tree.delete(1);
// tree.delete(3);

Tree.prettyPrint(tree.root);
