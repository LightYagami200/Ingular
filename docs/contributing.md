# Contributing

Refer to this file for details regarding Contribution

## For collaborators:

- You'll find #keys channel in Ingular Discord server where you will find API keys/tokens
- Create a file named `dev.js` in `config/` and use this code to populate that file:

  ```javascript
  module.exports = {
    discordBotToken: 'DISCORD_BOT_TOKEN_HERE',
    mongoConnectionString: 'MONGO_CONNECTION_STRING_HERE'
  };
  ```

- Replace `DISCORD_BOT_TOKEN_HERE` and `MONGO_CONNECTION_STRING_HERE` with the keys provided in #keys channel of Discord.
