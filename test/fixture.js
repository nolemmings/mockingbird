import { post } from './request';

export const expectations = [{
  request: {
    url: '/expectation1',
    method: 'get',
  },
  response: {
    status: 200,
    body: {
      hello: 'World!',
    }
  },
  repeat: 1,
}, {
  request: {
    url: '/expectation2',
    method: 'get',
  },
  response: {
    status: 201,
    headers: {
      'Header-1': 'value 1, value 2',
      'Header-2': 'value 3',
    },
    body: {
      hello: 'World!',
    }
  },
  repeat: 1,
}];

export function createExpectation(testId, body, done) {
  post(`/tests/${testId}/expectations`, 201, body, (err, res) => {
    done(err, res);
  });
}
