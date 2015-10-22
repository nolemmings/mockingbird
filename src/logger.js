import { transports as Transports, Logger } from 'winston';
import config from './config';

const transports = [];

if (config.get('log.level') !== 'none') {
  transports.push(new Transports.Console({
    colorize: true,
    prettyPrint: true,
    timestamp: true,
    level: config.get('log.level'),
  }));
}

const logger = new Logger({
  transports: transports,
});

export default logger;

export function requestLogger(req, res, next) {
  const url = req.originalUrl || req.url;
  req._startTime = (new Date);
  const end = res.end;
  res.end = (chunk, encoding) => {
    // Log response
    res.responseTime = (new Date) - req._startTime;
    res.end = end;
    res.end(chunk, encoding);

    // Parse response body
    const resBody = (chunk) ? chunk.toString() : '';

    // Create log msg
    const msg = `${req.method} ${url} ${res.statusCode} ${res.responseTime}ms ${resBody}`;

    // Determine log function based on response status code
    let logFunction = logger.info;
    if (res.statusCode >= 400) logFunction = logger.warn;
    if (res.statusCode >= 500) logFunction = logger.error;
    logFunction(msg);
  };
  next();
}
