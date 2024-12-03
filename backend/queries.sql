CREATE TABLE userlogin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

create table posts(
	post_id serial primary key,
	post_title varchar(30) not null,
	post_content text,
	post_date date,
	post_author int references userlogin(id) 
);

// getting all the posts
SELECT p.*, u.username 
FROM posts p 
JOIN userlogin u ON u.id = p.post_author;
