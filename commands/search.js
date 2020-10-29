const Command = require('./command');
const searchYouTubeFor = require('yt-search');
const Playlist = require('../data/models/playlist');
const Fuse = require('fuse.js');

module.exports = new class extends Command {
  name = 's';

  async execute(msg, ...query) {
    query = query.join(' ');
    if (!query)
      throw new TypeError('Query must be provided.');

    const listIds = (await Playlist.find()).map(p => p._id);

    let allVideos = [];
    for (const listId of listIds) {
      const { videos } = await searchYouTubeFor({ listId });
      if (videos?.length > 0)
        allVideos.push(...(videos ?? []));
    }

    const fuse = new Fuse(allVideos, {
      keys: [
        { name: 'title', weight: 1 }
      ]
    });

    const video = fuse
      .search(query)
      .map(r => r.item)[0];
    
    return msg.channel.send((video)
      ? `https://youtube.com/watch?v=${video.videoId}?list=${video.listId}`
      : '👀 Does ADAMJR have a video on this?...');
  }
};