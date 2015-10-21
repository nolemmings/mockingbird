import expectations from './expectations';
import log from './logger';

/**
 * Registers a new expectation.
 */
export default (req, res) => {
  const expectation = expectations.findById(req.params.testId, req.params.id);
  if (!expectation) {
    const msg = `Expectation with id '${req.params.id}' not found in test '${req.params.testId}'`;
    log.warn(msg);
    res.status(404).send({
      error: msg,
    });
  } else {
    res.status(200).send(expectation);
  }
};
