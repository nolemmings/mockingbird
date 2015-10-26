import expectations from '../models/expectations';

/**
 * Catchall request handler checks whether an expectation was defined; if so
 * return the result.
 */
export default (req, res) => {
  // Remove `/tests/:testId` from url
  const urlPieces = req.originalUrl.split('/');
  urlPieces.splice(0, 3);
  const matchUrl = '/' + urlPieces.join('/');

  const expectation = expectations.consume(req.params.testId, req.method, matchUrl);
  if (expectation) {
    // Return expected response
    if (expectation.response.headers) {
      res.set(expectation.response.headers);
    }
    if (expectation.response.body) {
      res.status(expectation.response.status).send(expectation.response.body);
    } else {
      res.status(expectation.response.status).send();
    }
  } else {
    // Return 404 whenever expectation could not be found
    const msg = `Expectation '${req.method.toUpperCase()} ${req.originalUrl}' not found in test '${req.params.testId}'`;
    res.status(404).send({
      error: msg,
    });
  }
};
