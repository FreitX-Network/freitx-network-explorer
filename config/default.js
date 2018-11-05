/* eslint-disable no-process-env */
import process from 'global/process';
require('dotenv').config();

module.exports = {
  project: 'freitx-explorer',
  env: 'development',
  server: {
    protocol: 'http:',
    host: 'localhost',
    port: process.env.PORT || 4015,
    staticDir: './dist',
    routePrefix: '/',
  },
  gateways: {
    logger: {
      enabled: true,
      baseDir: '/var/log/',
      topicName: 'freitx-explorer',
      level: 'debug',
      kafka: {
        leafHost: 'localhost',
        leafPort: 9093,
      },
    },
    freitxCore: {
      serverUrl: 'http://localhost:14004/',
    },
    walletCore: {
      serverUrl: '159.89.223.147:42124' || process.env.IOTEX_WALLET_URL,
    },
  },
  analytics: {
    googleTid: process.env.GOOGLE_TID || 'UA-XXXXXXXXX-1',
  },
};
