import expectations from '../models/expectations';

/**
 * Retrieves a new expectation.
 */
export default (req, res) => {
  const expectation = expectations.findById(req.params.testId, req.params.id);
  if (!expectation) {
    res.status(404).send({
      error: `Expectation with id '${req.params.id}' not found in test '${req.params.testId}'`,
    });
  } else {
    res.status(200).send(expectation);
  }
};
