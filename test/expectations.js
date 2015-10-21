import { post } from './request';
import { expect } from 'chai';

describe('POST /expectations', () => {
  let body = null;

  beforeEach(() => {
    body = {
      request: {
        url: '/test',
        method: 'get',
      },
      response: {
        status: 418,
        body: { hello: 'World!' },
      },
      repeat: 2,
    };
  });

  it('should create an expectation', (done) => {
    post('/expectations', 201, body, (err, res) => {
      if (err) return done(err);
      expect(res.body.request).to.deep.equal(body.request);
      expect(res.body.response).to.deep.equal(body.response);
      expect(res.body.requested).to.equal(0);
      expect(res.body.repeat).to.equal(body.repeat);
      done();
    });
  });
});
