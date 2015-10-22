import expectations from './expectations';

/**
 * Deletes all expectations associated with test id.
 */
export default (req, res) => {
  const removedItems = expectations.deleteByTestId(req.params.testId);
  if (removedItems.length > 0) {
    res.status(200).send(removedItems);
  } else {
    res.status(404).send({
      error: `Test '${req.params.id}' not found`,
    });
  }
};
