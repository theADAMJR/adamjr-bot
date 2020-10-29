const { readdirSync } = require('fs');
const { resolve } = require('path');
const config = require('../config.json');
const cooldowns = require('../handlers/cooldown-handler');

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
    if (!msg.content.startsWith(prefix)) return;
    
    const args = msg.content
      .split(' ')
      .slice(1);

    const commandName = msg.content
      .split(' ')[0]
      .slice(prefix.length);
  
    const command = commands.get(commandName);
    if (!command) return;

    if (cooldowns.has(msg.author.id))
      throw new TypeError(`This command has a \`${command.cooldown}s\` cooldown.`);

    if (command?.requiresOwner && msg.author.id !== config.authorId)
      throw new TypeError(`Only the bot owner can use this command.`);

    await command?.execute(msg, ...args);
    
    cooldowns.add(msg.author.id, command);
  } catch (err) {
    msg.channel.send(`⚠ ${err?.message}`);
  }
}

module.exports.handle = handle;