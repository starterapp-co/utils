import { AsyncLocalStorage } from 'node:async_hooks';

export type Logger = {
  log: (event: string, data?: Record<string, any>) => void;
  error: (event: string, error: Error, data?: Record<string, any>) => void;
  warn: (event: string, data?: Record<string, any>) => void;
  redLog: (event: string, data?: Record<string, any>) => void;
  addTags: (tags: Record<string, any>) => void;
};

export function provide(data: {
  als: AsyncLocalStorage<any>;
  newLogger: (options: {
    source: string;
    tags?: Record<string, any>;
  }) => Logger;
  generateTags?: () => Record<string, any>;
}): {
  getLogger: () => Logger;
  newLogger: (options: {
    source: string;
    tags?: Record<string, any>;
  }) => Logger;
};
export const LOGGER_KEY: Symbol;
