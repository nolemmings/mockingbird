import convict from 'convict';

const config = convict({
  port: {
    doc: 'The server port',
    default: 3000,
    env: 'PORT',
  },
});

config.validate();

export default config;
