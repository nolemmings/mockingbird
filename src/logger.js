import { transports, Logger } from 'winston';

const logger = new Logger({
  transports: [
    new transports.Console(),
  ],
});

export default logger;
