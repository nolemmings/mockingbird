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
    request.requested = 0;
    this.expectations.push(request);
    return request;
  }

  /**
   * Finds an expectation by its method and url.
   */
  findIndex(method, url) {
    const result = this.expectations.findIndex((expectation) => {
      return expectation.request.method.toLowerCase() === method.toLowerCase()
        && expectation.request.url === url;
    });
    return result;
  }

  /**
   * Returns the matched expectation or `undefined` when not found.
   *
   * Increments the `requested` property by 1 and removes the expectation
   * when the expectation has been requested the defined number of times.
   */
  consume(method, url) {
    const i = this.findIndex(method, url);
    const expectation = this.expectations[i];
    if (i > -1) {
      this.expectations[i].requested++;
      // Prevent from matching this expectation ever again
      if (this.expectations[i].requested === this.expectations[i].repeat) {
        this.expectations.splice(i, 1);
      }
    }
    return expectation;
  }
}

const expectations = new Expectations();

export default expectations;
