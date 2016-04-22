'use strict';

const config = {
  env: process.env.NODE_ENV || 'development',
  cron_check_time: '30 * * * * *',
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.NODE_PORT || 9001
  },
  telegram: {
    api_key: process.env.BOT_KEY,
    use_webhook : process.env.USE_WEBHOOK|| false
  },
  mongo: {
    uri: process.env.MONGO_URI
  }
};

export default Object.freeze(config);