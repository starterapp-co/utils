const assert = require('node:assert');
const { Queue } = require('../src/queue');


{
    // is length correct
    const queue = new Queue();
    assert.ok(queue.length === 0);
    queue.enqueue(5);
    assert.ok(queue.length === 1);
    queue.enqueue(4);
    assert.ok(queue.length === 2);
    queue.dequeue();
    assert.ok(queue.length === 1);
}

{
    // correct enqueue and dequeue order
    const queue = new Queue();
    queue.enqueue(1);
    assert.ok(queue.dequeue() === 1);
    queue.enqueue(1);
    queue.enqueue(2);
    assert.ok(queue.dequeue() === 1);
    assert.ok(queue.dequeue() === 2);
}

{
    // empty queue returns null
    const queue = new Queue();
    assert.ok(queue.dequeue() === null);
}

{
    // "head" is not dequeue value
    const queue = new Queue();
    queue.enqueue(5);
    assert.ok(queue.head === 5);
    assert.ok(queue.length === 1);
}