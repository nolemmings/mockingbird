import tests from '../models/tests';

/**
 * Retrieves a new expectation.
 */
export default (req, res) => {
  const expectations = tests.getExpectations(req.params.testId);
  if (!expectations) {
    return res.status(404).send({
      error: `Test '${req.params.id}' not found`,
    });
  }
  const expectation = expectations.find(elm => elm.id === req.params.id);
  if (!expectation) {
    res.status(404).send({
      error: `Expectation with id '${req.params.id}' not found in test '${req.params.testId}'`,
    });
  } else {
    res.status(200).send(expectation);
  }
};
