DROP TABLE IF EXISTS books;

DROP DATABASE IF EXISTS library;

CREATE DATABASE library;

USE library;

CREATE TABLE
  users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(8) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE
  );

CREATE TABLE
  books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(30) NOT NULL,
    genre VARCHAR(15) NOT NULL,
    publication_year YEAR NOT NULL,
    isbn VARCHAR(10) NOT NULL UNIQUE
  );

INSERT INTO
  books (title, author, genre, publication_year, isbn)
VALUES
  (
    'Harry Potter and the Sorcerer`s Stone',
    'J.K. Rowling',
    'Fantasy',
    1997,
    '0590358324'
  ),
  (
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    'Fantasy',
    1954,
    '0007175214'
  );

ALTER TABLE books MODIFY COLUMN isbn VARCHAR(10);

SHOW TABLES;

DESCRIBE books;

DESCRIBE users;