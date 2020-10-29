const cooldowns = new Map();

module.exports.add = (userId, command) => {
  cooldowns.set(userId, command.name);

  setTimeout(() => cooldowns.delete(userId), command.cooldown * 1000);
};
module.exports.has = (userId) => cooldowns.has(userId);