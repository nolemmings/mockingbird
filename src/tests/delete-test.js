import tests from '../models/tests';
import { testRepresentation } from './test-util';

/**
 * Deletes all expectations associated with test id.
 */
export default (req, res) => {
  const removed = tests.delete(req.params.testId);
  if (removed) {
    res.status(200).send(testRepresentation(removed));
  } else {
    res.status(404).send({
      error: `Test '${req.params.testId}' not found`,
    });
  }
};
