import expectations from './expectations';
import log from './logger';

/**
 * Catchall request handler checks whether an expectation was defined; if so
 * return the result.
 */
export default (req, res) => {
  const expectation = expectations.consume(req.method, req.originalUrl);
  if (expectation) {
    // Return expected response
    log.debug(`Processed expectation '${req.method.toUpperCase()} ${req.originalUrl}'`);
    res.status(expectation.response.status).send(expectation.response.body);
  } else {
    // Return 404 whenever expectation could not be found
    const msg = `Expectation '${req.method.toUpperCase()} ${req.originalUrl}' not found`;
    log.debug(msg);
    res.status(404).send({
      error: msg,
    });
  }
};
