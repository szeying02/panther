-- Queries relating to mainly the users table

-- Create a user
INSERT INTO users (username, password)
VALUES ('%s', '%s')
RETURNING id;

-- Obtains id and password from given username
SELECT id, password
FROM users
WHERE username = '%s';