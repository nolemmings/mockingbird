import expectations from '../models/expectations';
import { testRepresentation } from './test-util';

/**
 * Deletes all expectations associated with test id.
 */
export default (req, res) => {
  const removedItems = expectations.deleteByTestId(req.params.testId);
  if (removedItems.length > 0) {
    res.status(200).send(testRepresentation(removedItems));
  } else {
    res.status(404).send({
      error: `Test '${req.params.id}' not found`,
    });
  }
};
