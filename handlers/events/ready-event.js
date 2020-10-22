const EventHandler = require('./event-handler');
const config = require('../../config.json');
// const bot = require('../../bot');

module.exports = new class extends EventHandler {
  on = 'ready';

  invoke() {
    console.log('Ready!');

    // bot.user?.setActivity(config.bot.activity, { type: 'WATCHING' });
  }
}