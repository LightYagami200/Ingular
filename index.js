//===============
//DEPENDENCIES
//===============
const { Client } = require('klasa');
const keys = require('./config/keys');

//===============
//Client
//===============
const client = new Client({
  fetchAllMembers: false,
  prefix: '-',
  commandEditing: true,
  noPrefixDM: true,
  typing: true,
  providers: {
    default: 'mongodb',
    mongodb: {
      connectionString: keys.mongoConnectionString
    }
  },
  readyMessage: client => {
    client.user.setActivity('over Discord | -help', { type: 'WATCHING' });
  }
});

//===============
//Login
//===============
client.login(keys.discordBotToken);
