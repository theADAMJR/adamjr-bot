const EventHandler = require('./event-handler');
const config = require('../../config.json');

module.exports = new class extends EventHandler {
  on = 'ready';

  invoke(bot) {
    console.log('Ready!');

    bot.user?.setActivity(config.bot.activity, { type: 'WATCHING' });
  }
}