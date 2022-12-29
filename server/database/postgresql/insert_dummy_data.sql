-- filling the users table with dummy data
INSERT INTO users (username, password)
VALUES 
    ('johnny', 'password123'),
    ('harry', '234password'),
    ('ilovecats', 'password345');

-- filling the threads table with dummy data
INSERT INTO threads (user_id, title, content, datetime, category)
VALUES 
    ('1', 'How to get started with Web Development?', 'I stumbled across an article about the increasing prevalence of web development. I was wondering what are some languages or resources that I can use to get started?', current_timestamp, 'Technology'),
    ('3', 'Is it true that orange cats have a personality?', 'My family recently adopted an orange kitten. We already have an adult black cat at home. Both seem to be getting along well, and our orange cat does appear to be rather dramatic compared to our black cat. Haha.', current_timestamp, 'Animals');

-- filling the comments table with dummy data 
INSERT INTO comments (comment, user_id, thread_id, datetime)
VALUES
    ('Hello! I have recently gotten started with web dev myself. I think the first step is to learn more about the architecture required. Any article on the web will do!', '2', '1', current_timestamp), 
    ('You could probably look into react.js as a frontend framework.', '3', '1', current_timestamp), 
    ('I have seen online videos about it, and orange cats do tend to be a little more dramatic than the others.', '1', '2', current_timestamp);