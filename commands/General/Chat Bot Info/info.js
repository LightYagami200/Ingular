const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['details', 'what'],
      guarded: true,
      description: language => language.get('COMMAND_INFO_DESCRIPTION')
    });
  }

  async run(message) {
    return message.sendMessage(
      `**Ingular Bot**\n\nA moderation bot created for Discord Hack Week`
    );
  }
};
