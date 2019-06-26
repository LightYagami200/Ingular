//===============
//DEPENDENCIES
//===============
const { Client } = require('klasa');
const keys = require('./config/keys');

//===============
//Guild Schema
//===============
Client.defaultGuildSchema.add('roles', schema => schema.add('muted', 'role'));
Client.defaultGuildSchema.add('minAccAge', 'integer', { default: 1800000 });
Client.defaultGuildSchema.add('antiinvite', 'boolean', { default: false });

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
  pieceDefaults: {
    monitors: {
      ignoreOthers: false
    }
  },
  readyMessage: client => {
    client.user.setActivity('over Discord | -help', { type: 'WATCHING' });
    return 'Bot ready';
  }
});

//===============
//Login
//===============
client.login(keys.discordBotToken);
