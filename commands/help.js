const Command = require('./command');
const guilds = require('../data/guilds');

module.exports = new class extends Command {
  name = 'help';

  async execute(msg) {
    const savedGuild = await guilds.get(msg.guild.id);
    const prefix = savedGuild?.general.prefix ?? 'yt';
    
    return msg.channel.send(
      `\`${prefix}s [...query]\` - search using saved playlists\n` +
      `\`${prefix}o [...query]\` - search on StackOverflow\n`
      `\`${prefix}invite\` - get invite for bot`
    );
  }
};