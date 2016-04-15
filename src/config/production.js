'use strict';

const env_config = {
  server: {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || 9001
  },
  telegram: {
    api_key: '219358172:AAG7Fiy-CYxBdKZIoyjnuxCzjJ6440diD5g',
    use_webhook: true,
    webhook_url : ''
  },
  mongo: {
    uri: 'mongodb://<dbuser>:<dbpassword>@<host>:15730/appreviewbot'
  }
};


module.exports = env_config;