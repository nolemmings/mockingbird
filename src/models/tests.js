import Expectations from './expectations';

class Tests {
  constructor() {
    this.tests = {};
  }

  /**
   * Adds a request to the correct list and expectations.
   */
  add(testId, expected) {
    expected.testId = testId;
    if (!this.tests[testId]) this.tests[testId] = [];
    let expectations = this.findExpectations(testId, expected.request.method, expected.request.url);
    if (expectations) {
      // Add request to existing expectations
      expectations.add(expected);
    } else {
      // No expectations yet for specified method and url, create a new one
      expectations = new Expectations(expected.request.method, expected.request.url);
      expectations.add(expected);
      this.tests[testId].push(expectations);
    }
    return expected;
  }

  /**
   * Returns a single Expectations object by its method and url. Returns `null` when not found.
   */
  findExpectations(testId, method, url) {
    const test = this.tests[testId];
    if (!test) return null;

    return test.find(expectations => {
      return expectations.method.toLowerCase() === method.toLowerCase()
        && expectations.url === url;
    });
  }

  /**
   * Returns an array of all expectations with given test id.
   */
  getExpectations(testId) {
    const expectations = this.tests[testId];
    let result = null;
    if (expectations) {
      result = [];
      for (const expect of expectations) {
        result = result.concat(expect.getAll());
      }
    }
    return result;
  }

  /**
   * Deletes all expectations with a certain test id.
   *
   * Returns an array with all removed expectations.
   */
  delete(testId) {
    const expectations = this.getExpectations(testId);
    if (expectations) delete this.tests[testId];
    return expectations;
  }
}

const tests = new Tests();

export default tests;
