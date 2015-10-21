import { post } from './request';

export const expectation = {
  request: {
    url: '/unit-test',
    method: 'get',
  },
  response: {
    status: 418,
    body: {
      hello: 'World!',
    },
  },
  repeat: 1,
};

export function createExpectation(testId, body, done) {
  post(`/tests/${testId}/expectations`, 201, body, (err, res) => {
    done(err, res);
  });
}
