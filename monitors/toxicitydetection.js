const { Monitor } = require('klasa');
const Perspective = require('perspective-api-client');
const keys = require('../config/keys');

//Init
const perspective = new Perspective({ apiKey: keys.googleAPIKey });

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true,
      ignoreWebhooks: true
    });
  }

  async run(msg) {
    if (msg.channel.nsfw) return null;
    if (msg.content.length < 1) return null;
    if (await msg.hasAtLeastPermissionLevel(6)) return null;

    const result = await perspective.analyze(msg.content);
    if (
      result.attributeScores.TOXICITY.summaryScore.value >
      msg.guild.settings.toxicthreshold
    ) {
      if (msg.guild.settings.logs.toxic && msg.guild.settings.channels.logs)
        msg.guild.channels
          .get(msg.guild.settings.channels.logs)
          .send(
            `${msg.member.displayName} sent a toxic message containing \`${
              msg.content
            }\` in ${msg.channel}`
          );

      if (msg.guild.settings.antitoxic)
        msg.delete().then(console.log('Deleted'));
    }
  }
};
