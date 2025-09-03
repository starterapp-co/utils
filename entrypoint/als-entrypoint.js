const { randomUUID } = require('node:crypto');
const { LOGGER_KEY } = require('../logger/als-logger');
const { newLogger } = require('../logger/console-logger');
const CORRELATION_ID_KEY = Symbol('correlationId');
const TRACE_ID_KEY = Symbol('traceId');
const SOURCE_KEY = Symbol('source');

const init =
  (als) =>
  (fn, { source, traceId }) => {
    const correlationId = randomUUID();
    const tags = { correlationId, traceId };
    const logger = newLogger({ source, tags });
    const map = new Map([
      [LOGGER_KEY, logger],
      [CORRELATION_ID_KEY, correlationId],
      [SOURCE_KEY, source],
      [TRACE_ID_KEY, traceId],
    ]);
    return als.run(map, fn);
  };

module.exports = {
  init,
  LOGGER_KEY,
  SOURCE_KEY,
  CORRELATION_ID_KEY,
  TRACE_ID_KEY,
};
