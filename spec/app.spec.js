process.env.Node_ENV = 'test';
const request = require('supertest')(app);
const { expect } = require('chai');
const app = require('../app');

describe('/api', () => {
  describe('/topics', () => {
    it('GET status: 200 responds with an array of users', () => request
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users).to.be.an('array');
      }));
  });
});
