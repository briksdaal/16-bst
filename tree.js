import Node from './node.js';
import Queue from './queue.js';

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
        console.log(`Duplicate identified - ${value} - not added`);
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

  find(value) {
    let current = this.root;

    while (current !== null) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return current;
      }
    }
    // return null if not found
    return current;
  }

  levelOrder(cb) {
    const levelOrderArray = [];
    let current = this.root;

    if (current === null) {
      return levelOrderArray;
    }

    const queue = new Queue();

    queue.enqueue(current);

    while (!queue.isEmpty()) {
      current = queue.dequeue();

      if (current.left !== null) {
        queue.enqueue(current.left);
      }
      if (current.right !== null) {
        queue.enqueue(current.right);
      }

      if (cb) {
        cb(current.data);
      } else {
        levelOrderArray.push(current.data);
      }
    }

    if (!cb) {
      return levelOrderArray;
    }
    return undefined;
  }

  inorder(cb, current = this.root) {
    if (current === null) {
      return [];
    }

    if (cb) {
      this.inorder(cb, current.left);
      cb(current.data);
      this.inorder(cb, current.right);
      return null;
    }

    return [
      ...this.inorder(cb, current.left),
      current.data,
      ...this.inorder(cb, current.right),
    ];
  }

  preorder(cb, current = this.root) {
    if (current === null) {
      return [];
    }

    if (cb) {
      cb(current.data);
      this.preorder(cb, current.left);
      this.preorder(cb, current.right);
      return null;
    }

    return [
      current.data,
      ...this.preorder(cb, current.left),
      ...this.preorder(cb, current.right),
    ];
  }

  postorder(cb, current = this.root) {
    if (current === null) {
      return [];
    }

    if (cb) {
      this.postorder(cb, current.left);
      this.postorder(cb, current.right);
      cb(current.data);
      return null;
    }

    return [
      ...this.postorder(cb, current.left),
      ...this.postorder(cb, current.right),
      current.data,
    ];
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {
    if (!node) {
      return null;
    }

    let current = this.root;
    let nodeDepth = 0;

    while (current !== node && current !== null) {
      nodeDepth += 1;
      if (current.data > node.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return current === node ? nodeDepth : null;
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const sortedArrayofNodes = this.inorder();
    this.root = Tree.buildTreeAux(sortedArrayofNodes, 0, sortedArrayofNodes.length - 1);
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

export default Tree;
