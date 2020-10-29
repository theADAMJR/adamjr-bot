const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

const Command = require('./command');

module.exports = new class extends Command {
  name = 'o';
  cooldown = 5;

  async execute(msg, ...query) {
    query = query.join(' ');
    if (!query)
      throw new TypeError('Query must be provided.');

    const url = `https://api.stackexchange.com/2.2/search/advanced?site=stackoverflow&q=${query}&sort=relevance&key=${config.stackExchangeAPIKey}`;
    const res = await fetch(url);
    const result = await res.json();

    if (!result?.items)
      throw new TypeError('No results found.');

    const question = result.items[0];
    if (!question)
      throw new TypeError('Question not found.');

    await msg.channel.send(new MessageEmbed({
      title: question.title,
      url: question.link,
      fields: [
        { name: 'Upvotes', value: question.score, inline: true },
        { name: 'Answers', value: question.answer_count, inline: true },
        { name: 'Created At', value: new Date(question.creation_date * 1000)?.toDateString(), inline: true }
      ],
      thumbnail: { url: 'https://pbs.twimg.com/profile_images/1220067947798024192/30eZhfxx_400x400.png' }
    }));
  }
}
