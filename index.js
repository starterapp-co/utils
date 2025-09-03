const { init } = require('./entrypoint/als-entrypoint');
const { als } = require('./fn');
const { getLogger } = require('./logger/console-logger');

const entrypoint = init(als);

const httpEntrypoint = (req, res, next) =>
  entrypoint(next, {
    source: req.path,
    traceId: req.headers['x-trace-id'],
  });

const kafkaEntrypoint = (message, cb) =>
  entrypoint(cb, {
    source: message.message_type,
    traceId: message.trace_id,
  });

const bullMqEntrypoint = (job, cb) =>
  entrypoint(cb, {
    source: job.name,
    traceId: job.data.traceId,
  });

entrypoint(
  async () => {
    getLogger().log('Entrypoint initialized', {});
  },
  { source: 'entrypoint', traceId: 'init' },
);
