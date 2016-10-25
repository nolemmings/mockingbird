import uuid from 'node-uuid';
import _ from 'lodash';

/**
 * An expectations object contains all expected request/response-pairs defined
 * on a specified method and url.
 */
export default class Expectations {
  constructor(method, url, body = undefined) {
    this.method = method;
    this.url = url;
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
  matches(method, url, body = undefined) {
    return method.toLowerCase() === this.method.toLowerCase()
      && this.url === decodeURI(url)
      && (this.body === undefined || _.isEqual(body, this.body));
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
  consume() {
    const expectation = this.pending[0];
    if (expectation) {
      expectation.requestCount++;
      if (expectation.repeat !== -1 && expectation.requestCount >= expectation.repeat) {
        this.pending.splice(0, 1);
        this.finished.push(expectation);
      }
      return expectation;
    }
    return null;
  }
}
