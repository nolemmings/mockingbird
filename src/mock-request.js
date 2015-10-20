import expectations from './expectations';

/**
 * Catchall request handler checks whether an expectation was defined; if so
 * return the result.
 */
export default (req, res) => {
  const expectation = expectations.consume(req.method, req.originalUrl);
  if (expectation) {
    // Return expected response
    res.status(expectation.response.status).send(expectation.response.body);
  } else {
    // Return 404 whenever expectation could not be found
    res.status(404).send({
      error: `Expectation ${req.method.toUpperCase()} ${req.originalUrl} not found`,
    });
  }
};
