import tests from '../models/tests';
import Ajv from 'ajv';
import fs from 'fs';

// Load json schema
const postExpectationSchema = JSON.parse(fs.readFileSync(__dirname + '/post-expectation-schema.json', { encoding: 'utf8' }));
const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
});
ajv.addSchema(postExpectationSchema, 'postExpectationSchema');

/**
 * Registers a new expectation.
 */
export default (req, res) => {
  const valid = ajv.validate('postExpectationSchema', req.body);
  if (!valid) {
    res.status(422).send({
      error: 'Invalid input',
      errorDetails: ajv.errors,
    });
  } else {
    const expected = tests.add(req.params.testId, req.body);
    res.status(201).send(expected);
  }
};
