import { get, post } from '../request';
import { expect } from 'chai';
import { expectations, createExpectation } from '../fixture';
import uuid from 'node-uuid';

describe('POST /expectations', () => {
  describe('without body', () => {
    let testId = null;
    let expected = null;

    beforeEach((done) => {
      testId = uuid.v4();
      const body = Object.assign({}, expectations[0], {repeat: 2});
      createExpectation(testId, body, (err, res) => {
        if (err) return done(err);
        expected = res.body;
        done();
      });
    });

    it('should increase the requestCount whenever an expectation was consumed successfully', (done) => {
      get(`/tests/${testId}/expectation1`, 200, (err, res) => {
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

    it('should not consume when methods do not match', (done) => {
      post(`/tests/${testId}/expectation1`, 404, {}, (err) => {
        if (err) return done(err);
        done();
      });
    });

    it('should return response headers', (done) => {
      createExpectation(testId, expectations[1], (err) => {
        if (err) return done(err);
        get(`/tests/${testId}/expectation2`, 201, (err2, res2) => {
          if (err2) return done(err2);
          expect(res2.headers['header-1']).to.equal('value 1, value 2');
          expect(res2.headers['header-2']).to.equal('value 3');
          expect(res2.body).to.deep.equal({ hello: 'World!' });
          done();
        });
      });
    });

    it('should return 404 when all requests have been consumed', (done) => {
      const body = Object.assign({}, expectations[0], {repeat: 1, id: uuid.v4()});
      body.request.url = '/consumed';
      createExpectation(testId, body, (err) => {
        if (err) return done(err);
        createExpectation(testId, body, (err2) => {
          if (err2) return done(err2);
          get(`/tests/${testId}/consumed`, 200, (err3) => {
            if (err3) return done(err3);
            get(`/tests/${testId}/consumed`, 200, (err4) => {
              if (err4) return done(err4);
              get(`/tests/${testId}/consumed`, 429, (err5) => {
                done(err5);
              });
            });
          });
        });
      });
    });

    it('should consider repeat = -1 to be indefinite', (done) => {
      const body = Object.assign({}, expectations[0], {repeat: -1, id: uuid.v4()});
      body.request.url = '/consumed';
      createExpectation(testId, body, (err) => {
        if (err) return done(err);
        get(`/tests/${testId}/consumed`, 200, (err2) => {
          if (err2) return done(err2);
          get(`/tests/${testId}/consumed`, 200, (err3) => {
            done(err3);
          });
        });
      });
    });
  });

  describe('with body param', () => {
    let testId = null;
    let expected = null;

    beforeEach((done) => {
      testId = uuid.v4();
      const body = Object.assign({}, expectations[2], { repeat: 2 });
      createExpectation(testId, body, (err, res) => {
        if (err) return done(err);
        expected = res.body;
        done();
      });
    });

    it('should return response with valid request body and increment requestCount', (done) => {
      post(`/tests/${testId}/expectation3`, 201, expectations[2].request.body, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal({ test: 'test' });
        get(`/tests/${testId}/expectations/${expected.id}`, 200, (err2, res2) => {
          if (err2) return done(err2);
          expect(res2.body.requestCount).to.equal(1);
          done();
        });
      });
    });

    it('should not accept request when body is specified but doesn not match', (done) => {
      post(`/tests/${testId}/expectation3`, 404, {}, (err) => {
        done(err);
      });
    });
  });
});
