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
      description: 'Strike a member',
      extendedHelp: 'No extended help available.',
      usage: '<member:user> [strikes:int]',
      usageDelim: ' ',
      quotedStringSupport: false,
      subcommands: false
    });
  }

  async run(msg, [user, strikes]) {
    if (user.id === msg.author.id) throw 'Why would you strike yourself?';
    if (user.id === this.client.user.id) throw 'Have I done something wrong?';

    const member = await msg.guild.members.fetch(user).catch(() => null);

    if (member) {
      if (member.roles.highest.position >= msg.member.roles.highest.position)
        throw 'You cannot strike this user.';
      if (!member.bannable) throw 'I cannot strike this user.';

      const strikesToStrike = strikes ? strikes : 1;

      await user.settings.update(
        'strikes',
        user.settings.strikes + strikesToStrike
      );

      msg.reply(
        `Striked ${member.displayName}\n\n${
          member.displayName
        }'s Total Strikes: ${user.settings.strikes}`
      );

      if (user.settings.strikes >= msg.guild.settings.strikes.ban) {
        await member.ban({ reason: 'Banned for too many strikes' });
        msg.reply(`${member.displayName} got banned for too many strikes`);
      } else if (user.settings.strikes >= msg.guild.settings.strikes.kick) {
        await member.kick({ reason: 'Kicked for too many strikes' });
        msg.reply(`${member.displayName} got kicked for too many strikes`);
      } else if (user.settings.strikes >= msg.guild.settings.strikes.mute) {
        await member.roles.add(msg.guild.settings.roles.muted);
        msg.reply(`${member.displayName} got muted for too many strikes`);
      }
    }
  }
};
