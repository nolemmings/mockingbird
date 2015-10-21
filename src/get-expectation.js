import expectations from './expectations';

/**
 * Registers a new expectation.
 */
export default (req, res) => {
  const expectation = expectations.findById(req.params.id);
  if (!expectation) {
    res.status(404).send({
      error: `Expectation with id '${req.params.id}' not found`,
    });
  } else {
    res.status(200).send(expectation);
  }
};
