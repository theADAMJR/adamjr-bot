const EventHandler = require('./event-handler');
const { handle } = require('../command-handler');
const guilds = require('../../data/guilds');

module.exports = new class extends EventHandler {
  on = 'message';

  async invoke(msg) {
    const savedGuild = await guilds.get(msg.guild.id);

    if (msg.content.includes(savedGuild.general.prefix))
      await handle(msg, savedGuild);
  }
}
