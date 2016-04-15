'use strict';

const config = {
  env: process.env.NODE_ENV || 'development'
};

const envConfig = require(`./${config.env}`);

export default Object.freeze(Object.assign(config, envConfig));