const Command = require('./command');
const config = require('../config.json');

module.exports = new class extends Command {
  name = 'help-me';

  async execute(msg) {
    const helperRoleId = config.helperRoles
      .find(id => id === msg.guild?.roles.cache.has(id));
    return msg.channel.send(`<@${helperRoleId}>`);
  }
};