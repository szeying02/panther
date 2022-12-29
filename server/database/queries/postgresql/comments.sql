-- Queries relating to the threads table

-- Retrives all comments relating to a given thread id ordered from oldest to most recent comment
SELECT comments.id, comments.user_id, users.username, comments.comment, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - comments.datetime))) AS timediff
FROM comments
LEFT JOIN users ON users.id = comments.user_id
WHERE comments.thread_id = %s
ORDER BY comments.datetime;

-- Creates a comment
INSERT INTO comments (comment, user_id, thread_id, datetime)
VALUES
    ('%s', '%s', '%s', current_timestamp);

-- Deletes comments given thread id
DELETE 
FROM comments 
WHERE comments.thread_id = %s;

-- Delete comment given comment id
DELETE 
FROM comments
WHERE comments.id = %s;

-- Update comment given comment id
UPDATE comments
SET comment = '%s'
WHERE comments.id = %s;