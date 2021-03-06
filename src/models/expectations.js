import uuid from 'node-uuid';

/**
 * An expectations object contains all expected request/response-pairs defined
 * on a specified method and url.
 */
export default class Expectations {
  constructor(method, requestUrl, body = undefined) {
    this.method = method;
    this.url = requestUrl;
    this.body = body;
    this.pending = [];
    this.finished = [];
  }

  /**
   * Adds a request to the pending expectations.
   */
  add(request) {
    request.requestCount = 0;
    request.id = uuid.v4();
    request.requests = [];
    if (!request.repeat) {
      request.repeat = 1;
    }
    this.pending.push(request);
    return request;
  }

  /**
   * Returns all expectations.
   */
  getAll() {
    return [].concat(this.finished, this.pending);
  }

  /**
   * Returns true when this expectation matches specified method, url and body.
   * When the body of this expectation is `undefined` any body will match.
   */
  matches(method, requestUrl, body = undefined) {
    return method.toLowerCase() === this.method.toLowerCase()
      && this.url === requestUrl
      && (this.body === undefined || body === this.body);
  }

  /**
   * Returns whether any consumable expectations.
   */
  hasPending() {
    return this.pending.length > 0;
  }

  /**
   * Finds an expectation by its id.
   */
  find(id) {
    for (const expectation of this.getAll()) {
      if (expectation.id === id) return expectation;
    }
    return null;
  }

  /**
   * Returns the first pending expectation or `null` when none found.
   *
   * Increments the `requestCount` property by 1 and removes the expectation
   * from the pending expectation array when the expectation has been requested
   * the maximum number of times.
   */
  consume(request) {
    const expectation = this.pending[0];
    if (expectation) {
      expectation.requestCount++;
      expectation.requests.push({ body: request.body });
      if (expectation.repeat !== -1 && expectation.requestCount >= expectation.repeat) {
        this.pending.splice(0, 1);
        this.finished.push(expectation);
      }
      return expectation;
    }
    return null;
  }
}
