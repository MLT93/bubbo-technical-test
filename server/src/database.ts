import pgPromise from "pg-promise";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Connection to testing database
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;
const test_firebase = pgPromise()(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/postgres`
);
console.log(test_firebase);
// Connection to Firebase server & database
initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore();

// Table creation
const setupDb = async () => {
  await test_firebase.none(`  
  DROP TABLE IF EXISTS users;

  CREATE TABLE
    users (
      user_id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR(30) NOT NULL UNIQUE,
      password VARCHAR(8) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      token TEXT
    );
  
  DROP TABLE IF EXISTS books;
  
  CREATE TABLE
    books (
      book_id SERIAL NOT NULL PRIMARY KEY,
      author VARCHAR(30) NOT NULL,
      genre VARCHAR(15) NOT NULL,
      title VARCHAR(70) NOT NULL,
      publication_date DATE NOT NULL
    );
  `);

  // Adding data into test server
  await test_firebase.none(`
  INSERT INTO users 
  (username, password, email)
  VALUES
  ('Marcos', 'asd123', 'testing@test.com');      
  `);
  await test_firebase.none(`
  INSERT INTO books
  (title, author, genre, publication_date)
  VALUES 
  ('Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 'Fantasy', '1997/05/10');
  `);
};
setupDb();

export { test_firebase, db };
