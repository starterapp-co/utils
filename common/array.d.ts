export function indexBy<T extends Record<keyof T, any>>(
  array: T[],
  by: ((item: T) => string) | keyof T,
): { [key: string]: T };

export function groupBy<T extends Record<keyof T, any>>(
  array: T[],
  by: ((item: T) => string) | keyof T,
): { [key: string]: T[] };
