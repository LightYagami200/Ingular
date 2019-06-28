const { Monitor } = require('klasa');
const keys = require('../config/keys');
const isImageUrl = require('is-image-url');
const sightengine = require('sightengine')(
  keys.sightEngineUser,
  keys.sightEngineSecret
);

//Init

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
    if (!msg.guild.settings.antipartialnudity && !msg.guild.settings.antinudity)
      return null;

    if (msg.attachments.size > 0)
      msg.attachments.forEach(attachment => {
        if (isImageUrl(attachment.url))
          sightengine
            .check(['nudity'])
            .set_url(attachment.url)
            .then(res => {
              if (
                msg.guild.settings.logs.nudity &&
                msg.guild.settings.channels.logs &&
                (res.nudity.raw > 0.8 || res.nudity.partial > 0.8)
              ) {
                msg.guild.channels
                  .get(msg.guild.settings.channels.logs)
                  .send(
                    `${msg.member.displayName} sent a ${
                      res.nudity.raw > 0.8 ? 'nude' : 'partially nude'
                    } pic in ${msg.channel}`
                  );
              }

              if (msg.guild.settings.antinudity && res.nudity.raw > 0.8) {
                msg.delete();
              }

              if (
                msg.guild.settings.antipartialnudity &&
                res.nudity.partial > 0.8
              ) {
                msg.delete();
              }
            });
      });
  }
};
