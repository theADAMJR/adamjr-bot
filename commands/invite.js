const Command = require('./command');
const config = require('../config.json');

module.exports = new class extends Command {
  name = 'invite';

  async execute(msg) {
    return msg.channel.send(`https://discord.com/oauth2/authorize?client_id=${config.bot.id}&scope=bot&permissions=19456`);
  }
};
