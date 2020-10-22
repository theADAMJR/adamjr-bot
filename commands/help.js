const Command = require('./command');
const guilds = require('../data/guilds');

module.exports = new class extends Command {
  name = 'help';

  async execute(msg) {
    const savedGuild = await guilds.get(msg.guild.id);
    return msg.channel.send(
      `\`${savedGuild.general.prefix}search [...query]\`\n` +
      `\`${savedGuild.general.prefix}add-playlist [yt_playlist_id]\`\n` +
      `\`${savedGuild.general.prefix}remove-playlist [yt_playlist_id]\`\n`
    );
  }
};