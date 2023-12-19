export function initLogger(options?: { chatBot: (message: string) => any }): (
  scope: string,
) => {
  log: (
    event: string,
    data: Record<string, any> | string,
    toTelegram?: boolean,
  ) => void;
  warn: (
    event: string,
    data: Record<string, any> | string,
    toTelegram?: boolean,
  ) => void;
  error: (
    event: string,
    error: Error,
    data?: Record<string, any> | string,
    toTelegram?: boolean,
  ) => void;
};
