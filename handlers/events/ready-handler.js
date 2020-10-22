const bot = require('../../bot');
const EventHandler = require('./event-handler');
const config = require('../../config.json');

module.exports = new class extends EventHandler {
  on = 'ready';

  invoke() {
    console.log('Ready!');

    bot.setActivity(config.bot.activity, { type: 'WATCHING' });
  }
}