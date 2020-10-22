const { readdirSync } = require('fs');
const { resolve } = require('path');
const config = require('../config.json');

const commands = new Map();

const commandsDir = resolve('./commands');
const files = readdirSync(commandsDir);

for (const file of files) {
  const command = require(`${commandsDir}/${file}`);
  if (!command.name) continue;

  commands.set(command.name, command);
}

async function handle(msg, savedGuild) {
  try {
    const prefix = savedGuild.general.prefix;
    const args = msg.content
      .split(' ')
      .slice(1);

    const commandName = msg.content
      .split(' ')[0]
      .slice(prefix.length);
  
    const command = commands.get(commandName);
    if (command?.requiresOwner && msg.author.id !== config.authorId)
      throw new TypeError(`Only the bot owner can use this command.`);

    await command?.execute(msg, ...args);
  } catch (err) {
    msg.channel.send(`⚠ ${err?.message}`);
  }
}

module.exports.handle = handle;