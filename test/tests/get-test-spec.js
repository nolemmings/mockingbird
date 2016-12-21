import { get, post } from '../request';
import { expect } from 'chai';
import { expectations, createExpectation } from '../fixture';
import uuid from 'node-uuid';

describe('GET /test', () => {
  let testId1 = null;
  let requestBody = {
    a: 1,
    b: { c: 3 },
  };

  beforeEach((done) => {
    testId1 = uuid.v4();
    createExpectation(testId1, expectations[2], (err) => {
      if (err) return done(err);
      done();
    });
  });

  it('should not have any requests consumed initially', (done) => {
    get(`/tests/${testId1}`, 200, (err, res) => {
      if (err) return done(err);

      expect(res.body.expectations.length).to.equal(1);
      expect(res.body.expectations[0].requestCount).to.equal(0);
      expect(res.body.expectations[0].requests).to.deep.equal([]);
      done();
    });
  });

  it('should also return the request bodies', (done) => {
    post(`/tests/${testId1}/expectation3`, 201, requestBody, (err, res) => {
      if (err) return done(err);

      get(`/tests/${testId1}`, 200, (err2, res2) => {
        if (err2) return done(err2);

        expect(res2.body.expectations.length).to.equal(1);
        expect(res2.body.expectations[0].requestCount).to.equal(1);
        expect(res2.body.expectations[0].requests[0]).to.deep.equal({ body: JSON.stringify(requestBody)});
        done();
      });
    });
  });
});
