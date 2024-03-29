CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL

);

CREATE TABLE groups(
    group_id SERIAL UNIQUE NOT NULL, 
    creator_id int references users(user_id) NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    author_id int references users(user_id) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT Now(),
    content TEXT NOT NULL,
    group_name VARCHAR(50) references groups(name) NOT NULL
);
CREATE TYPE requeststatus AS ENUM ('pending','accepted','declined');
CREATE TABLE isMemberOfGroup(
    group_id int references groups(group_id) NOT NULL,
    user_id int references users(user_id) NOT NULL,
    -- this probably has to change,not yet live
    participation_request_status requeststatus NOT NULL
);


CREATE TABLE areFriends(
    user1 int references users(user_id) NOT NULL,
    user2 int references users(user_id) NOT NULL,
    friendrequest_status requeststatus NOT NULL,
    PRIMARY KEY(user1,user2)
);

CREATE TABLE comments(
    -- this was now added 
    post_id int references posts(post_id) NOT NULL,
    comment_id SERIAL PRIMARY KEY NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT Now() NOT NULL,
    author_id int references users(user_id) NOT NULL,
    content TEXT NOT NULL,
    replies_to int references comments(comment_id)
);


-- to check if it is proper design
CREATE TABLE groupchat_messages(
    group_id int references groups(group_id) NOT NULL,
    author_id int references users(user_id) NOT NULL,
    author_name VARCHAR(50) references users(name),
    content TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE chat_messages(
    user1 int references users(user_id) NOT NULL,
    user2 int references users(user_id) NOT NULL,
    author_name VARCHAR(50) references users(name),
    content TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
--todo add check that authorname is one of the two users name

ALTER TABLE groupchat_messages ADD message_id SERIAL PRIMARY KEY;
ALTER TABLE chat_messages ADD message_id SERIAL PRIMARY KEY;
ALTER TABLE chat_messages ADD chat_id SERIAL;
--todo idea: chat_messages-> broken into chat {user1,user2,chat_id} ,chat_messages{chat_id,...chatDetails}
insert into ismemberofgroup (group_id,user_id,participation_request_status) VALUES (2,2,'accepted');
insert into ismemberofgroup (group_id,user_id,participation_request_status) VALUES (2,4,'accepted');


