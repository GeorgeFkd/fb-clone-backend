CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    password CHAR(60)

);

CREATE TABLE groups(
    group_id SERIAL UNIQUE,
    creator_id int references users(user_id),
    name VARCHAR(50) UNIQUE,
    PRIMARY KEY(name)
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    author_id int references users(user_id),
    createdAt TIMESTAMPTZ,
    content TEXT,
    group_name VARCHAR(50) references groups(name) default 'public'
);

CREATE TABLE isMemberOfGroup(
    group_id int references groups(group_id),
    user_id int references users(user_id)
);

CREATE TYPE requeststatus AS ENUM ('pending','accepted','declined');
CREATE TABLE areFriends(
    user1 int references users(user_id),
    user2 int references users(user_id),
    friendrequest_status requeststatus,
    PRIMARY KEY(user1,user2)
);

CREATE TABLE comments(
    -- this was now added 
    post_id int references posts(post_id),
    comment_id SERIAL PRIMARY KEY,
    createdAt TIMESTAMPTZ DEFAULT Now(),
    author_id int references users(user_id),
    content TEXT,
    replies_to int references comments(comment_id)
);


