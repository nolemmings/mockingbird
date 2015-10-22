import { get } from './request';
import { expect } from 'chai';
import { expectation, createExpectation } from './fixture';
import uuid from 'node-uuid';

describe('POST /expectations', () => {
  let testId = null;
  let expected = null;

  beforeEach((done) => {
    testId = uuid.v4();
    const body = Object.assign({}, expectation, {repeat: 2});
    createExpectation(testId, body, (err, res) => {
      if (err) return done(err);
      expected = res.body;
      done();
    });
  });

  it('should increase the requestCount whenever an expectation was consumed successfully', (done) => {
    get(`/tests/${testId}/unit-test`, 418, (err, res) => {
      if (err) return done(err);
      expect(res.body).to.deep.equal({ hello: 'World!' });
      get(`/tests/${testId}/expectations/${expected.id}`, 200, (err2, res2) => {
        if (err2) return done(err2);
        expect(res2.body.requestCount).to.equal(1);
        expect(res2.body.repeat).to.equal(2);
        done();
      });
    });
  });

  it('should return 404 when all requests have been consumed', (done) => {
    const body = Object.assign({}, expectation, {repeat: 1, id: uuid.v4()});
    body.request.url = '/unit-test-2';
    createExpectation(testId, body, (err) => {
      if (err) return done(err);
      get(`/tests/${testId}/unit-test-2`, 418, (err2) => {
        if (err2) return done(err2);
        get(`/tests/${testId}/unit-test-2`, 404, (err3) => {
          done(err3);
        });
      });
    });
  });

  it('should consider repeat = -1 to be indefinite', (done) => {
    const body = Object.assign({}, expectation, {repeat: -1, id: uuid.v4()});
    body.request.url = '/unit-test-3';
    createExpectation(testId, body, (err) => {
      if (err) return done(err);
      get(`/tests/${testId}/unit-test-3`, 418, (err2) => {
        if (err2) return done(err2);
        get(`/tests/${testId}/unit-test-2`, 418, (err3) => {
          done(err3);
        });
      });
    });
  });
});
