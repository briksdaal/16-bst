class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    const newNode = Queue.Node(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const nodeToReturn = this.head;

    if (this.head.next === null) {
      this.tail = null;
    }

    this.head = this.head.next;

    return nodeToReturn.data;
  }

  isEmpty() {
    return this.head === null;
  }

  toString() {
    let current = this.head;
    let string = '';

    while (current !== null) {
      string += `${current.data} => `;
      current = current.next;
    }

    string += 'null';

    return string;
  }

  static Node(newData) {
    return {
      data: newData === undefined ? null : newData,
      next: null,
    };
  }
}

export default Queue;
