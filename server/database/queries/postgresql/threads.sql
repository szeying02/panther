-- Queries relating to the threads table

-- Retrieves all threads in descending order (including number of comments), starting with most recent on top
SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments
FROM threads
LEFT JOIN comments ON threads.id = comments.thread_id
LEFT JOIN users ON users.id = threads.user_id
GROUP BY (threads.id, users.username)
ORDER BY threads.datetime DESC;

-- Creates a thread
INSERT INTO threads (user_id, title, content, datetime, category)
VALUES ('%s', '%s', '%s', current_timestamp, '%s');

-- Obtains a thread based on thread id
SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments
FROM threads
LEFT JOIN comments ON threads.id = comments.thread_id
LEFT JOIN users ON users.id = threads.user_id
WHERE threads.id = %s
GROUP BY (threads.id, users.username);

-- Deletes a thread based on thread id
DELETE 
FROM threads 
WHERE threads.id = %s;

-- Updates a thread based on thread id
UPDATE threads
SET title = '%s',
    content = '%s', 
    category = '%s'
WHERE threads.id = %s;

-- Obtains threads with the given category
SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments
FROM threads
LEFT JOIN comments ON threads.id = comments.thread_id
LEFT JOIN users ON users.id = threads.user_id
WHERE threads.category = 'General'
GROUP BY (threads.id, users.username)
ORDER BY threads.datetime DESC;

-- Search title & content based on given string
SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments
FROM threads 
LEFT JOIN comments ON threads.id = comments.thread_id
LEFT JOIN users ON users.id = threads.user_id
WHERE to_tsvector(threads.title) @@ to_tsquery('%s') OR to_tsvector(threads.content) @@ to_tsquery('%s')
GROUP BY (threads.id, users.username);

-- Search title based on given string + filter based on given category
SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments
FROM threads 
LEFT JOIN comments ON threads.id = comments.thread_id
LEFT JOIN users ON users.id = threads.user_id
WHERE threads.category = '%s' AND (to_tsvector(threads.title) @@ to_tsquery('%s') OR to_tsvector(threads.content) @@ to_tsquery('%s'))
GROUP BY (threads.id, users.username);