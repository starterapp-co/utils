const { provide } = require('./als-logger');
const { als } = require('../fn');
const { randomUUID } = require('node:crypto');

class NewLogger {
  source;
  tags;
  constructor({ source, tags = {} }) {
    this.source = source;
    this.tags = tags;
  }
  log(event, data) {
    console.log(
      JSON.stringify({ event, data, tags: this.tags, source: this.source }),
    );
  }
  warn(event, data) {
    console.log(
      JSON.stringify({ event, data, tags: this.tags, source: this.source }),
    );
  }
  error(event, error, data) {
    console.error(
      JSON.stringify({
        event,
        data,
        error,
        tags: this.tags,
        source: this.source,
      }),
    );
  }
  redLog(event, data) {
    console.log(
      JSON.stringify({ event, data, tags: this.tags, source: this.source }),
    );
  }
}

const { getLogger, newLogger } = provide({
  als: als,
  createLogger: ({ source, tags }) => new NewLogger({ source, tags }),
  generateTags: () => ({ correlationId: randomUUID() }),
});

module.exports = { getLogger, newLogger };
