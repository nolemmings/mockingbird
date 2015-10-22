import request from 'supertest';
import app from '../src/server';

export function post(url, status, body, done) {
  request(app)
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .expect(status, done);
}

export function get(url, status, done) {
  request(app)
    .get(url)
    .set('Accept', 'application/json')
    .expect(status, done);
}

export function del(url, status, done) {
  request(app)
    .delete(url)
    .expect(status, done);
}
