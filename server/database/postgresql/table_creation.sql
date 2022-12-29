-- Create users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

-- Create threads Table
CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL,
    category VARCHAR(100) NOT NULL,
    
    FOREIGN KEY (user_id) 
        REFERENCES users (id)
);

-- Create comments Table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    datetime TIMESTAMP NOT NULL,

    FOREIGN KEY (user_id) 
        REFERENCES users (id),
    FOREIGN KEY (thread_id)
        REFERENCES threads (id)
);