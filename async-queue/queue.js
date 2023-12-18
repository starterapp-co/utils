class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  #head;
  #tail;

  constructor() {
    this.#tail = null;
    this.#head = null;
    this.length = 0;
  }

  enqueue(value) {
    const task = new Node(value);
    if (this.#head) {
      this.#tail.next = task;
      this.#tail = task;
    } else {
      this.#head = task;
      this.#tail = this.#head;
    }
    this.length++;
    return this;
  }

  dequeue() {
    if (this.#head === null) return null;
    const current = this.#head;
    this.#head = this.#head.next;
    this.length--;
    return current.value;
  }

  get head() {
    return this.#head?.value ?? null;
  }
}


module.exports = {Queue};