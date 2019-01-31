process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);
describe('/api', () => {
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));

  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET status: 200 responds with an array of topics', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contains.keys('slug', 'description');
      }));

    it('POST status: 201 responds topic added to topics table', () => {
      const newTopic = {
        description: 'Writing, reading really fun',
        slug: 'reading',
      };
      return request
        .post('/api/topics')
        .send(newTopic)
        .expect(201)
        .then(({ body }) => {
          // console.log(body);
          expect(body.topic.slug).to.equal(newTopic.slug);
          expect(body.topic.description).to.equal(newTopic.description);
        });
    });
  });
  describe('/:topic/articles', () => {
    it('GET status 200 responds for array of articles for given topic', () => {
      request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(10);
          expect(body.articles[0]).to.have.keys(
            'article_id',
            'title',
            'author',
            'votes',
            'comment_count',
            'created_at',
            'topic',
          );
        });
    });
  });
});
