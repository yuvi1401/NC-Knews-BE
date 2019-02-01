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

  it('GET status error for wrong startpoint with errormessage', () => request
    .get('/wrongstartpoint')
    .expect(404)
    .then(({ body }) => {
      // console.log(body);
      expect(body).to.haveOwnProperty('message');
    }));

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
    it('GET status:400 responds with error message for request with bad id', () => request
      .post('/api/topics')
      .send({ username: 'bbc' })
      .expect(400)
      .then(({ body }) => {
        // console.log(body);
        expect(body).to.haveOwnProperty('message');
      }));
  });
  describe('/:topic/articles', () => {
    it('GET status 200 responds for array of articles for given topic', () => {
      request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
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
    it('GET status 200 for queries for limit and pagination', () => {
      request
        .get('/api/topics/mitch/articles?limit=10&p=2')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(1);
        });
    });
    it('GET status 200 for queries for pagination', () => {
      request
        .get('/api/topics/mitch/articles?limit=11&p=1')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.have.length(11);
        });
    });
    it('GET status 200 for querie order', () => {
      request
        .get('/api/topics/mitch/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].title).to.equal('Moustache');
        });
    });
    it('GET status 200 for querie order sort_by', () => {
      request
        .get('/api/topics/mitch/articles?sort_by=title')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].title).to.equal('Z');
        });
    });
    it('GET status 404 for wrong topic', () => {
      request
        .get('/api/topics/barbara/articles')
        .expect(404)
        .then(({ body }) => {
          // console.log(body);
          expect(body).to.haveOwnProperty('message');
        });
    });

    it('POST status: 201 responds for posted article for given topic', () => {
      const newArticle = {
        username: 'rogersop',
        title: 'spider web',
        body: 'under the dark world of spider web',
      };
      return request
        .post('/api/topics/mitch/articles')
        .send(newArticle)
        .expect(201)
        .then(({ body }) => {
          // console.log(body);
          expect(body.article).to.have.keys(
            'username',
            'title',
            'body',
            'topic',
            'votes',
            'article_id',
            'created_at',
          );
          expect(body.article.username).to.equal(newArticle.username);
          expect(body.article.title).to.equal(newArticle.title);
          expect(body.article.body).to.equal(newArticle.body);
          expect(body.article.topic).to.equal('mitch');
        });
    });
    it('GET status:400 responds with error message for request with bad id', () => request
      .post('/api/topics/mitch/articles')
      .send({ slug: 'bbc' })
      .expect(400)
      .then(({ body }) => {
        // console.log(body);
        expect(body).to.haveOwnProperty('message');
      }));
  });

  describe('/api/articles', () => {
    it('GET status 200 responds for array of articles', () => {
      request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
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
    it('GET status 200 for response limit on page', () => {
      request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(10);
        });
    });
    it('GET status 200 for response limit change on page', () => {
      request
        .get('/api/articles?limit=5')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(5);
        });
    });
    it('GET status 200 for response on page 2 for default limit', () => {
      request
        .get('/api/articles?p=2')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(2);
        });
    });
    it('GET status 200 for response on page 2 for default limit', () => {
      request
        .get('/api/articles?p=2')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(2);
        });
    });
    it('GET status 200 for response for given order', () => {
      request
        .get('/api/articles?sort_by=article_id&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].article_id).to.equal(1);
        });
    });
    describe('/:article_id', () => {
      it('GET status 200 responds for given article_id', () => {
        request
          .get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.have.keys(
              'article_id',
              'title',
              'author',
              'votes',
              'body',
              'comment_count',
              'created_at',
              'topic',
            );
            expect(body.article.article_id).to.equal(1);
            expect(body.article.author).to.equal('butter_bridge');
            expect(body.article.body).to.equal('I find this existence challenging');
          });
      });
      it('GET status 404 error response for incorrect id request', () => {
        request
          .get('/api/articles/678')
          .expect(404)
          .then(({ body }) => {
            // console.log(body);
            expect(body).to.haveOwnProperty('message');
          });
      });
    });
  });
});
