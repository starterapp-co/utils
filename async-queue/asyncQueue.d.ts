type ExecutableFunction = (...args) => any;
type Arguments = any[];
type Task = { fn: ExecutableFunction, args: Arguments };
type AsyncQueueOptions = { delay: number, maxSize?: number };

export class AsyncQueue {
  public constructor(options: AsyncQueueOptions);

  public wait<T>(fn: (...args) => any, ...args: any[]): Promise<T>;

  public get length(): number;
 
  public get baseOptions(): AsyncQueueOptions;

  public on(eventName: 'add', fn: (job: Task) => void);
  public on(eventName: 'error', fn: (error: Error) => void);
  public on(eventName: 'done', fn: (job: Task, returnValue: any) => void);
  public on(eventName: 'empty', fn: () => void);
}