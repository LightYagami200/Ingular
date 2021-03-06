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
      cooldown: 0,
      promptLimit: 0,
      promptTime: 30000,
      deletable: false,
      guarded: false,
      nsfw: false,
      permissionLevel: 6,
      description: 'remove strike from member',
      extendedHelp: 'No extended help available.',
      usage: '<member:user> [strikes:int]',
      usageDelim: ' ',
      quotedStringSupport: false,
      subcommands: false
    });
  }

  async run(msg, [user, strikes]) {
    if (user.id === msg.author.id) throw 'can not clear your past';
    if (user.id === this.client.user.id) throw 'Have I done something wrong?';

    const member = await msg.guild.members.fetch(user).catch(() => null);

    if (member) {
      if (member.roles.highest.position >= msg.member.roles.highest.position)
        throw 'You cannot forgive this user.';
      if (!member.bannable) throw 'I cannot forgive this user.';

      const strikesToRemove = strikes ? strikes : 1;

      await user.settings.update(
        'strikes',
        user.settings.strikes - strikesToRemove
      );

      if (user.settings.strikes < 0) await user.settings.update('strikes', 0);

      msg.reply(
        `Forgave ${member.displayName}\n\n${
          member.displayName
        }'s Total Strikes: ${user.settings.strikes}`
      );
    }
  }
};
