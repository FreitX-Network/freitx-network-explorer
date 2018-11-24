/* eslint-disable no-process-env */
import process from 'global/process';

require('dotenv').config();

module.exports = {
  project: 'freitx-explorer',
  env: 'development',
  server: {
    protocol: 'http:',
    host: 'localhost',
    port: 14008,
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
      serverUrl: 'localhost:42124' ,
    },
  },
  analytics: {
    googleTid: process.env.GOOGLE_TID || 'UA-XXXXXXXXX-1',
  },
  chains: JSON.parse('[{"id":1,"name":"mainchain","url":"http://localhost:4004/"},{"id":2,"name":"subchain","url":"http://localhost:4005/"}]'),
};
