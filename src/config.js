import convict from 'convict';

const config = convict({
  port: {
    doc: 'The server port',
    default: 3000,
    env: 'PORT',
  },
  log: {
    level: {
      doc: 'Log everything from this level and above. Set "none" to disable the log stream.',
      env: 'LOG_LEVEL',
      format: ['none', 'verbose', 'debug', 'info', 'warn', 'error'],
      default: 'debug',
    },
  },
});

config.validate();

export default config;
