import expectations from './expectations';

/**
 * Retrieves all expectations associated with a test id.
 */
export default (req, res) => {
  const items = expectations.getByTestId(req.params.testId);
  if (items.length > 0) {
    res.status(200).send(items);
  } else {
    res.status(404).send({
      error: `Test '${req.params.id}' not found`,
    });
  }
};
