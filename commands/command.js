module.exports = class Command {
  name = '';
  requiresOwner = false;
  cooldown = 0;

  execute(msg) {
    throw new TypeError('Command not implemented.');
  } 
}