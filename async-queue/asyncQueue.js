const {Queue} = require('./queue');
const {EventEmitter} = require('node:events');

class AsyncQueue extends EventEmitter {
  #baseOptions;
  #TASK_ERROR = Symbol('task.error');
  #TASK_DONE = Symbol('task.done');
  #TASK_ADD = Symbol('task.add');

  constructor(options) {
    super();
    this.#setBaseOptions(options);
    this.#initListeners();
    this.queue = new Queue();
  }

  wait(fn, ...args) {
    return new Promise((resolve, reject) => {
      const value = {fn, args, resolve, reject};
      this.queue.enqueue(value);
      this.emit(this.#TASK_ADD, value);
      this.emit('add', value);
    })
  }

  get baseOption() {
    return this.#baseOptions;
  }

  get length() {
    return this.queue.length;
  }

  #initListeners() {
    this.prependListener(this.#TASK_ERROR, this.#onError.bind(this))
    this.prependListener(this.#TASK_DONE, this.#onDone.bind(this))
    this.prependListener(this.#TASK_ADD, this.#onAdd.bind(this))
  }

  async #onAdd(task) {
    if (this.queue.length === 1) {
      await this.#execute(task);
    }
  }

  async #onError({task, error}) {
    if (task.reject) task.reject(error);
    await this.#asyncDelay(this.#baseOptions.delay);
    this.queue.dequeue();
    const nextTask = this.queue.head;
    if (nextTask) await this.#execute(nextTask);
    else this.emit('empty');
  }

  async #onDone({task, result}) {
    if (task.resolve) task.resolve(result);
    await this.#asyncDelay(this.#baseOptions.delay);
    this.queue.dequeue();
    const nextTask = this.queue.head;
    if (nextTask) await this.#execute(nextTask);
    else this.emit('empty');
  }

  async #execute(task) {
    this.emit('execute', task);
    let result;
    try {
      result = await task.fn(...task.args);
    } catch (error) {
      this.emit(this.#TASK_ERROR, {task, error});
      this.emit('error', error);
      return;
    }
    this.emit(this.#TASK_DONE, {task, result});
    this.emit('done', result);
  }

  #asyncDelay(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  #setBaseOptions(options) {
    if (options.delay < 0) throw new Error('delay < 0');
    if (typeof options.maxSize === 'number' && options.maxSize <= 0) {
      throw new Error('max size <= 0');
    }
    this.#baseOptions = {maxSize: options.maxSize ?? Number.POSITIVE_INFINITY, delay: options.delay};
  }
}

module.exports = {AsyncQueue};