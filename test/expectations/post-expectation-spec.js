import { post } from '../request';
import { expect } from 'chai';
import { expectations } from '../fixture';
import uuid from 'node-uuid';

describe('POST /expectations', () => {
  let body = null;

  beforeEach(() => {
    body = Object.assign({}, expectations[2]);
  });

  it('should create an expectation', (done) => {
    post(`/tests/${uuid.v4()}/expectations`, 201, body, (err, res) => {
      if (err) return done(err);
      expect(res.body.request).to.deep.equal(body.request);
      expect(res.body.response).to.deep.equal(body.response);
      expect(res.body.requestCount).to.equal(0);
      expect(res.body.repeat).to.equal(body.repeat);
      done();
    });
  });

  it('should trigger validation errors', (done) => {
    post(`/tests/${uuid.v4()}/expectations`, 422, {}, (err, res) => {
      if (err) return done(err);
      expect(res.body.error).to.equal('Invalid input');
      expect(res.body.errorDetails[0]).to.deep.equal({
        keyword: 'required',
        dataPath: '/request',
        message: 'is a required property',
      });
      expect(res.body.errorDetails[1]).to.deep.equal({
        keyword: 'required',
        dataPath: '/response',
        message: 'is a required property',
      });
      done();
    });
  });
});
