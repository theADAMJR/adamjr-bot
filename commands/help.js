const Command = require('./command');
const guilds = require('../data/guilds');

module.exports = new class extends Command {
  name = 'help';

  async execute(msg) {
    const savedGuild = await guilds.get(msg.guild.id);
    return msg.channel.send(
      `\`${savedGuild.general.prefix}s [...query]\` - search using saved playlists\n` +
      `\`${savedGuild.general.prefix}o [...query]\` - search on StackOverflow\n`
    );
  }
};