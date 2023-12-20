const indexBy = (arr, by) => {
  return arr.reduce((acc, item) => {
    const key = typeof by === 'function' ? by(item) : item[by];
    acc[key] = item;
    return acc;
  }, {});
};

const groupBy = (arr, by) => {
  return arr.reduce((acc, item) => {
    const key = typeof by === 'function' ? by(item) : item[by];
    if (acc[key]) acc[key].push(item);
    else acc[key] = [item];
    return acc;
  }, {});
};

module.exports = { indexBy, groupBy };
