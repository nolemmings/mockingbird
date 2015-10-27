import tests from '../models/tests';
import { testRepresentation } from './test-util';

/**
 * Retrieves all expectations associated with a test id.
 */
export default (req, res) => {
  const items = tests.getExpectations(req.params.testId);
  if (items.length > 0) {
    res.status(200).send(testRepresentation(items));
  } else {
    res.status(404).send({
      error: `Test '${req.params.id}' not found`,
    });
  }
};
