import { get, post } from './request';
import { expect } from 'chai';
import { expectation, createExpectation } from './fixture';

describe('POST /expectations', () => {
  let expected = null;

  beforeEach((done) => {
    createExpectation(expectation, (err, res) => {
      if (err) return done(err);
      expected = res.body;
      done();
    });
  });

  it('should increase the requestCount whenever an expectation was consumed successfully', (done) => {
    get('/test', 418, (err, res) => {
      if (err) return done(err);
      expect(res.body).to.deep.equal({ hello: 'World!' });
      get(`/expectations/${expected.id}`, 200, (err, res) => {
        if (err) return done(err);
        console.log('res.body', res.body)
        done();
      });
    });
  });
});
