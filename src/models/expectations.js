import uuid from 'node-uuid';

class Expectations {
  constructor() {
    this.expectations = [];
  }

  /**
   * Creates a new request expectation on the bottom of the stack.
   */
  add(testId, request) {
    request.id = uuid.v4();
    request.testId = testId;
    if (!request.repeat) {
      request.repeat = 1;
    }
    request.requestCount = 0;
    this.expectations.push(request);
    return request;
  }

  /**
   * Finds an expectation by its id.
   */
  findById(testId, id) {
    const result = this.expectations.find(expectation => {
      return expectation.testId === testId && expectation.id === id;
    });
    return result;
  }

  /**
   * Finds an expectation by its method and url.
   */
  findIndex(testId, method, url) {
    return this.expectations.findIndex(expectation => {
      return expectation.testId === testId
        && expectation.request.method.toLowerCase() === method.toLowerCase()
        && expectation.request.url === url;
    });
  }

  /**
   * Returns a list of all expectations with given test id.
   */
  getByTestId(testId) {
    return this.expectations.filter(elm => {
      return elm.testId === testId;
    });
  }

  /**
   * Deletes all tests with a certain test id.
   */
  deleteByTestId(testId) {
    const removedItems = this.expectations.filter(elm => {
      return elm.testId === testId;
    });
    this.expectations = this.expectations.filter(elm => {
      return elm.testId !== testId;
    });
    return removedItems; // Return removed items
  }

  /**
   * Returns the matched expectation or `null` when not found.
   *
   * Increments the `requested` property by 1 and removes the expectation
   * when the expectation has been requested the defined number of times.
   */
  consume(testId, method, url) {
    const i = this.findIndex(testId, method, url);
    if (i > -1) {
      const expectation = this.expectations[i];
      expectation.requestCount++;
      // Prevent from matching this expectation ever again
      if (expectation.repeat !== -1 && expectation.requestCount === expectation.repeat) {
        this.expectations.splice(i, 1);
      }
      return expectation;
    }
    return null;
  }
}

const expectations = new Expectations();

export default expectations;
