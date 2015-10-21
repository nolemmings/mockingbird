class Expectations {
  constructor() {
    this.expectations = [];
  }

  /**
   * Creates a new request expectation on the bottom of the stack.
   */
  add(request) {
    if (!request.repeat) {
      request.repeat = 1;
    }
    request.requestCount = 0;
    this.expectations.push(request);
    return request;
  }

  /**
   * Finds an expectation by its method and url.
   */
  findIndex(method, url) {
    const index = this.expectations.findIndex(expectation => {
      return expectation.request.method.toLowerCase() === method.toLowerCase()
        && expectation.request.url === url;
    });
    return index;
  }

  /**
   * Returns the matched expectation or `null` when not found.
   *
   * Increments the `requested` property by 1 and removes the expectation
   * when the expectation has been requested the defined number of times.
   */
  consume(method, url) {
    const i = this.findIndex(method, url);
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
