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

  it('GET 404 status error for wrong startpoint with errormessage', () => request
    .get('/wrongstartpoint')
    .expect(404)
    .then(({ body }) => {
      expect(body).to.haveOwnProperty('message');
    }));

  describe('/topics', () => {
    it('GET status: 200 responds with an array of topics', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
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
          expect(body.topic.slug).to.equal(newTopic.slug);
          expect(body.topic.description).to.equal(newTopic.description);
        });
    });
    it('Post/topic status:400 responds with error message for incorrect input', () => request
      .post('/api/topics')
      .send({ username: 'bbc' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.eql('incorrect input post request cannot be processed');
      }));
    it('Post/topic status:400 responds with error message for unique key', () => request
      .post('/api/topics')
      .send({ slug: 'cats', description: '' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.eql('key value already exist');
      }));
  });
  describe('/:topic/articles', () => {
    it('GET status 200 responds for array of articles for given topic', () => {
      request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
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
          expect(body.articles).to.have.length(11);
        });
    });
    it('GET status 200 for querie order', () => {
      request
        .get('/api/topics/mitch/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].title).to.equal('Moustache');
        });
    });
    it('GET status 200 for querie order sort_by', () => {
      request
        .get('/api/topics/mitch/articles?sort_by=title')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].title).to.equal('Z');
        });
    });
    it('GET status 404 for wrong topic', () => {
      request
        .get('/api/topics/barbara/articles')
        .expect(404)
        .then(({ body }) => {
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
    it('POST/article status:400 responds with error message for incorrect input', () => request
      .post('/api/topics/mitch/articles')
      .send({ slug: 'bbc' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.eql('incorrect input post request cannot be processed');
      }));
    it('POST/article status:400 responds for key doesnot exist', () => request
      .post('/api/topics/mitch/articles')
      .send({
        username: 'rogersocat',
        title: 'code',
        body: 'under the dark world of spider web',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.eql('key is not present in the source table');
      }));
  });

  describe('/api/articles', () => {
    it('GET status 200 responds for array of articles', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
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
          'body',
        );
      }));
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
      it('GET status 400 error response for invalid id syntax', () => {
        request
          .get('/api/articles/str')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal('Invalid input syntax');
          });
      });
      it('GET status 404 error response for incorrect id request', () => {
        request
          .get('/api/articles/500')
          .expect(404)
          .then(({ body }) => {
            expect(body.message).to.equal('Not found');
          });
      });
      it('DELETE article by article id and send status 204', () => request.delete('/api/articles/1').expect(204));

      it('PATCH should update the correct articles votes for given id', () => request
        .patch('/api/articles/1')
        .expect(200)
        .send({ inc_votes: 1 })
        .then(({ body }) => {
          expect(body.votes).to.equal(101);
        }));

      it('PATCH should increament articles by given votes for article id', () => request
        .patch('/api/articles/4')
        .expect(200)
        .send({ inc_votes: 4 })
        .then(({ body }) => {
          expect(body.votes).to.equal(4);
        }));
      it('PATCH should decreament articles by given votes for article id', () => request
        .patch('/api/articles/4')
        .expect(200)
        .send({ inc_votes: -1 })
        .then(({ body }) => {
          expect(body.votes).to.equal(-1);
        }));
      it('PATCH should decreament articles by given votes for article id', () => request
        .patch('/api/articles/1')
        .expect(200)
        .send({ inc_votes: -1 })
        .then(({ body }) => {
          expect(body.votes).to.equal(99);
        }));
      it('PATCH Status 404 for invalid syntax', () => request
        .patch('/api/articles/100')
        .send({ inc_votes: 2 })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Not found');
        }));
    });
    describe('/:article_id/comments', () => {
      it('GET status 200 responce for array of comments for article_id', () => request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an('array');
          expect(body.comments[0]).to.have.keys(
            'comment_id',
            'votes',
            'created_at',
            'author',
            'body',
          );
        }));
      it('GET status:200 responce for default limit of 10', () => request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(10);
        }));
      it('GET status:200 responce for default created_at', () => request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].created_at > body.comments[1].created_at).to.equal(true);
          expect(body.comments[1].created_at > body.comments[2].created_at).to.equal(true);
        }));
      it('GET status:200 responce for order asc DEFAULT created_at', () => request
        .get('/api/articles/1/comments?order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].created_at < body.comments[1].created_at).to.equal(true);
          expect(body.comments[1].created_at < body.comments[2].created_at).to.equal(true);
        }));
      it('GET status:200 responce for sort_by Votes DEFAULT desc', () => request
        .get('/api/articles/1/comments?sort_by=votes')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].votes > body.comments[1].votes).to.equal(true);
          expect(body.comments[1].votes > body.comments[2].votes).to.equal(true);
        }));
      it('GET status:200 responce for limit variation on DEFAULT page 1', () => request
        .get('/api/articles/1/comments?limit=5')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(5);
        }));
      it('GET status:200 responce for pagination for DEFAULT limit ', () => request
        .get('/api/articles/1/comments?p=2')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(3);
        }));
      it('POST status: 201 respond for posted comment for given article_id', () => {
        const newComment = {
          username: 'icellusedkars',
          body: 'Latest hourley forecast for weather today',
        };
        return request
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).to.have.keys(
              'username',
              'body',
              'votes',
              'created_at',
              'article_id',
              'comment_id',
            );
            expect(body.comment.username).to.equal(newComment.username);
            expect(body.comment.body).to.equal(newComment.body);
            expect(body.comment.article_id).to.equal(1);
            expect(body.comment.votes).to.equal(0);
          });
      });
      it('POST/comment status:400 respond with error message for request with incorrect key data', () => {
        const newComment = {
          username: 'cricket',
          body: '',
        };
        return request
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.eql('key is not present in the source table');
          });
      });
      it('POST/comment status:400 respond with error message for request with bad input', () => request
        .post('/api/articles/1/comments')
        .send({ slug: 'bbc' })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql('incorrect input post request cannot be processed');
        }));
      it('PATCH should increament the votes for given comment id & +ve inc_votes', () => request
        .patch('/api/articles/9/comments/1')
        .send({ inc_votes: 5 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(21);
        }));
      it('PATCH should decreament the votes for given comment id & -ve inc_votes', () => request
        .patch('/api/articles/9/comments/1')
        .send({ inc_votes: -5 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(11);
        }));
      it('PATCH Status 404 for invalid syntax comment id & -ve inc_votes', () => request
        .patch('/api/articles/400/comments/1')
        .send({ inc_votes: 2 })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Not found');
        }));
      it('DELETE comment by comment id for given article id and send status 204', () => request.delete('/api/articles/1/comments/2').expect(204));
    });
  });
  describe('/users', () => {
    it('GET status: 200 responds with an array of users', () => request
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users).to.be.an('array');
        expect(body.users[0]).to.contains.keys('username', 'avatar_url', 'name');
      }));
    it('POST status: 201 responds users added to users table', () => {
      const newUser = {
        username: 'fun_centre',
        avatar_url: 'https://wwww.funcentre.com/wp-content/try.jpg',
        name: 'cobra',
      };
      return request
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body.user.username).to.equal(newUser.username);
          expect(body.user.name).to.equal(newUser.name);
          expect(body.user).to.eql(newUser);
        });
    });
    it('Post/topic status:400 responds with error message for incorrect input', () => request
      .post('/api/users')
      .send({ slug: 'bbc' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.eql('incorrect input post request cannot be processed');
      }));
    it('Post/topic status:400 responds with error message for unique key', () => request
      .post('/api/users')
      .send({ username: 'butter_bridge', avatar_url: '', name: '' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.eql('key value already exist');
      }));
  });
});
