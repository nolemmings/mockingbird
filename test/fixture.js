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
    },
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
    },
  },
  repeat: 1,
}, {
  request: {
    url: '/expectation3',
    method: 'post',
    body: {
      a: 1,
      b: { c: 3 },
    },
  },
  response: {
    status: 201,
    headers: {
      'Header-1': 'value 1, value 2',
      'Header-2': 'value 3',
    },
    body: {
      test: 'test',
    },
  },
  repeat: 1,
}, {
  request: {
    url: '/expectation4',
    method: 'post',
    body: null, // Expect empty body
  },
  response: {
    status: 201,
    body: 4,
  },
  repeat: 1,
}, {
  request: {
    url: `/escape?test=${encodeURIComponent(" ',")}`,
    method: 'get',
  },
  response: {
    status: 200,
    body: {
      hello: 'Escape this',
    },
  },
  repeat: 1,
}, ];

export function createExpectation(testId, body, done) {
  post(`/tests/${testId}/expectations`, 201, body, (err, res) => {
    done(err, res);
  });
}
