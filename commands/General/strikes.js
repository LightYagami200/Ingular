const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: 268435462,
      requiredSettings: [],
      aliases: [],
      autoAliases: true,
      bucket: 1,
      cooldown: 5,
      promptLimit: 0,
      promptTime: 30000,
      deletable: false,
      guarded: false,
      nsfw: false,
      permissionLevel: 0,
      description: 'View your strikes',
      extendedHelp: 'No extended help available.',
      usage: '[member:user]',
      usageDelim: ' ',
      quotedStringSupport: false,
      subcommands: false
    });
  }

  async run(msg, [user]) {
    const member = await msg.guild.members
      .fetch(user ? user : msg.user)
      .catch(() => null);

    if (member) {
      msg.reply(
        `${user ? member.displayName + "'s" : 'Your'} total strikes: ${
          member.user.settings.strikes
        }`
      );
    }
  }
};
