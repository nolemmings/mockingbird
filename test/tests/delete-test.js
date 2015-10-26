import { get, del } from '../request';
import { expect } from 'chai';
import { expectations, createExpectation } from '../fixture';
import uuid from 'node-uuid';

describe('DELETE /test', () => {
  let testId1 = null;
  let testId2 = null;

  beforeEach((done) => {
    testId1 = uuid.v4();
    testId2 = uuid.v4();
    const body = Object.assign({}, expectations[0], {repeat: 2});
    createExpectation(testId1, body, (err) => {
      if (err) return done(err);
      createExpectation(testId2, body, (err2) => {
        if (err2) return done(err2);
        done();
      });
    });
  });

  it('should delete a test', (done) => {
    del(`/tests/${testId1}`, 200, (err, res) => {
      if (err) return done(err);
      expect(res.body.expectations[0].testId).to.equal(testId1);
      get(`/tests/${testId2}`, 200, (err2, res2) => {
        if (err2) return done(err2);
        expect(res2.body.expectations[0].testId).to.equal(testId2);
        done();
      });
    });
  });

  it('should return 404 when test id not found', (done) => {
    del(`/tests/invalid`, 404, (err) => {
      done(err);
    });
  });
});
