const { curry } = require('../common/curry');
const { AsyncQueue } = require('../async-queue/asyncQueue');
const { chunk } = require('../common/string');

const BASE_URL = 'https://api.telegram.org';

const curried = (queue) =>
  curry(async (delay, botToken, chatId, message) => {
    const url = `${BASE_URL}/bot${botToken}/sendMessage?chat_id=${chatId}`;
    const messages = chunk(message, 4096);
    const result = [];
    for (const message of messages) {
      const resultUrl = new URL(url + `&text=${encodeURIComponent(message)}`);
      const response = await queue.wait(fetch, resultUrl);
      result.push(await response.json());
    }
    return result;
  });

const bot = ({ delay, token }) =>
  curried(new AsyncQueue({ delay: delay ?? 0 }))(delay)(token);
const chatBot = ({ token, delay, chatId }) => bot({ delay, token })(chatId);
const sendMessage = ({ token, delay, chatId, message }) =>
  chatBot({ token, delay, chatId })(message);

module.exports = { bot, chatBot, sendMessage };
