'use strict';

const config = {
  env: process.env.NODE_ENV || 'development',
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.NODE_PORT || 9001
  },
  telegram: {
    api_key: process.env.BOT_KEY,
    webhook_url : process.env.WEBHOOK_URL || ''
  },
  mongo: {
    uri: process.env.MONGO_URI
  }
};

export default Object.freeze(config);