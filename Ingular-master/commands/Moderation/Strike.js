//under construction
const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 6,
      description:
        'Strike someone',
      usage: '<member:user> [reason:...string]',
      usageDelim: ' '
    });
  }

  async run(msg, [user, reason]) {
    if (user.id === msg.author.id) throw 'Why strike yourself';
    if (user.id === this.client.user.id) throw 'Yikes';

    const member = await msg.guild.members.fetch(user).catch(() => null);
    if (member) {
      if (member.roles.highest.position >= msg.member.roles.highest.position)
        throw 'You cannot strike this user.';
      if (!member.bannable) throw 'Cannot strike this peron';
    }
  }
};
