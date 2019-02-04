Prerequisites
Running this API locally will require PostgreSQL, Node, NPM and a terminal, to edit it you'll need a text-editor.

Install Node.js by following the instructions on their website. This installation will include NPM.

Download and install PostgreSQL, alternatively if you have the package manager Homebrew you can run this command:

brew install postgresql
Optional - Postman is software to send HTTP requests and is very useful for using this api.

Here is a guide on getting started with postgres. You will only need to get yourself logged in and the psql server running to use this project. Minimum version 11.1 required - you can check your Postgres version by running psql --version in your terminal.

Installation
Fork this repo
Clone down to your local machine
Open the project directory in your terminal and run 'npm install' to install the required dependencies
Create a knexfile.js in the project root directory to allow knex to access your database., the contents of this should look like :
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
client: 'pg',
migrations: {
directory: './db/migrations',
},
seeds: {
directory: './db/seeds',
},
};

const customConfigs = {
development: { connection: { database: 'nc_knews' } },
test: { connection: { database: 'nc_knews_test' } },
};

To create the database, we need to run psql -f ./db/dev-setup.sql, this will create an empty database for us to insert our data into.
To add data to our new database, we will run npm run seed - this will run our migrations to create tables in the database, then insert the data in /db/data/development-data.

To start the api's server running locally, you can run npm start to run the server in Node or npm run dev to run the server in Nodemon.
The server will then be available to send requests to and retrive data
GET localhost:9090/api

To run the tests, run npm test in your terminal - this will drop and re-create the database, run all migrations and re-seed the test database before runnin automated tests for all endpoints and methods/
he tests
describe('/articles', () => {
it('GET request should return status 200 and respond with an array of article objects, each object having properties author, title, article_id, body, votes, comment_count, created_at and topic', () => request
.get('/api/articles')
.expect(200)
.then(({ body }) => {
expect(body.articles[0]).to.have.all.keys(
'author',
'title',
'article_id',
'votes',
'comment_count',
'created_at',
'topic',
);
The tests will make requests to each endpoint, with valid and invalid requests to make sure the api runs, sends the correct data or sends the correct error message for an invalid request.

.expect(200)
For a successful request, we're expecting the status code 200 - success

.then(({ body }) => {
expect(body.article.article_id).to.equal(1);
})
Afterwards, we destructure the body of the request's response and check that it has the right properties

it('POST request should respond status code 404 if posted to an article ID that doesnt exist', () =>
request
.post('/api/articles/6969/comments')
.send({ username: 'icellusedkars', body: 'real comment' })
.expect(404));
for this invalid request, we just test for the correct status code - 404 not found.

it('POST request should create a user that is able to log in', () =>
request
.post('/api/users')
.send({
username: 'log',
name: 'log',
password: 'bag'
})
.expect(201)
.then(() =>
request
.post('/login')
.send({ username: 'log', password: 'cabin' })
.expect(200)
.then(({ body }) => {
expect(body).to.have.property('');
})
));
This test makes multiple requests, expecting different status codes and results. To do this we chain the follow-up request in the .then() of the first request and return a second request. This is important to ensure the first request is functioning correctly, as the result is not directly testable from the first request's response.

Deployment
to host your own version you can follow these steps:

Install the Heroku CLI
Run Heroku login in your terminal to open a browser window to login to your heroku account
Run this command:
Heroku create <your project name>
You can then run this command to provision a PostgreSQL database for your API:
heroku addons:create heroku-postgresql:hobby-dev
To make sure this has worked, run the command:
heroku config:get: DATABASE_URL
If the database has been created, this should return a long URL beginning postgres://.

To set the secret key for encrypting user passwords, run this command (the database will not seed correctly without this):
heroku config:set JWT_SECRET=<your secret recommended 64+ chars>
To deploy your api, git commit your changes and run git push heroku master. This will upload your app to Heroku's servers and build it. You can then run heroku open to see your app live.
