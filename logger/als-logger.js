const LOGGER_KEY = Symbol('logger');

const provide = ({ als, createLogger, generateTags = () => ({}) }) => {
  const newLogger = ({ source, tags }) => createLogger({ source, tags });
  const getLogger = () =>
    als?.getStore()?.get(LOGGER_KEY) ??
    newLogger({ source: 'unknown', tags: generateTags() });
  return { newLogger, getLogger };
};

module.exports = { provide, LOGGER_KEY };
