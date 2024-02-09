DROP TABLE IF EXISTS users;

CREATE TABLE
  users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(8) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    token TEXT
  );

DROP TABLE IF EXISTS books;

CREATE TABLE
  books (
    book_id VARCHAR NOT NULL PRIMARY KEY ,
    author VARCHAR(30) NOT NULL,
    genre VARCHAR(15) NOT NULL,
    title VARCHAR(70) NOT NULL,
    publication_date DATE NOT NULL,
  );