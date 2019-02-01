\c nc_knews_test

-- SELECT * FROM topics;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

--SELECT * FROM articles JOIN comments ON comments.article_id = articles.article_id
--ORDER BY articles.created_at DESC LIMIT 10

--SELECT * FROM articles JOIN comments ON comments.article_id = articles.article_id
--GROUP BY articles.article_id ORDER BY articles.created_at DESC LIMIT 10
--ERROR:  column "comments.comment_id" must appear in the GROUP BY clause or be used in an aggregate function

--SELECT articles.article_id, articles.username, articles.title, articles.votes, articles.created_at, articles.topic
--FROM articles JOIN comments ON comments.article_id = articles.article_id
--GROUP BY articles.article_id ORDER BY articles.created_at DESC LIMIT 10
--Not got any information about comments table apart from votes no comment_id

--SELECT articles.article_id, articles.username, articles.title, articles.votes, articles.created_at, articles.topic
--FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
--GROUP BY articles.article_id ORDER BY articles.created_at DESC LIMIT 10

SELECT articles.article_id, articles.username, articles.title, articles.votes, 
articles.created_at, articles.topic  COUNT (comments.comment_id)
FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id ORDER BY articles.created_at DESC LIMIT 10
-- SELECT * FROM articles