import { post } from './request';

export const expectation = {
  request: {
    url: '/test',
    method: 'get',
  },
  response: {
    status: 418,
    body: {
      hello: 'World!'
    },
  },
  repeat: 1,
};

export function createExpectation(body, done) {
  post('/expectations', 201, body, (err, res) => {
    done(err, res);
  });
}
