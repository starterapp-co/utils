const chunk = (str, size) =>
  str ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [''];

module.exports = { chunk };
