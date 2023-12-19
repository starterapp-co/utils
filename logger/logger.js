const initLogger = (options) => (scope) => ({
  log: (event, data, toTelegram) => {
    try {
      console.log(
        JSON.stringify({
          event,
          data,
          scope,
          dateTime: new Date(),
          timestamp: new Date().getTime(),
          level: 'LOG',
        }),
      );
      if (toTelegram && options.chatBot) {
        options.chatBot(JSON.stringify(data)).catch(console.error);
      }
    } catch (e) {
      console.error(e);
    }
  },
  warn: (event, data, toTelegram) => {
    try {
      console.log(
        JSON.stringify({
          event,
          data,
          scope,
          dateTime: new Date(),
          timestamp: new Date().getTime(),
          level: 'WARN',
        }),
      );
      if (toTelegram && options.chatBot) {
        options.chatBot('WARN\n', JSON.stringify(data)).catch(console.error);
      }
    } catch (e) {
      console.error(e);
    }
  },
  error: (event, error, data, toTelegram) => {
    try {
      console.log(
        JSON.stringify({
          event,
          data,
          scope,
          dateTime: new Date(),
          timestamp: new Date().getTime(),
          level: 'ERROR',
          error: {
            name: error.name,
            stack: error.stack,
            message: error.message,
          },
        }),
      );
      if (toTelegram && options.chatBot) {
        options.chatBot('ERROR\n', JSON.stringify(data)).catch(console.error);
      }
    } catch (e) {
      console.error(e);
    }
  },
});

module.exports = { initLogger };
