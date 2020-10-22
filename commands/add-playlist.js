const Command = require('./command');
const Playlist = require('../data/models/playlist');

module.exports = new class extends Command {
  name = 'add-playlist';
  isOwner = true;

  async execute(msg, playlistId) {
    await Playlist.create({ _id: playlistId });

    const playlistCount = await Playlist.countDocuments();
    return msg.channel.send(`There are now \`${playlistCount}\` playlist(s).`);
  }
};