module.exports = class Command {
  name = '';
  requiresOwner = false;

  execute(msg) {
    throw new TypeError('Command not implemented.');
  } 
}