import pgPromise from "pg-promise";
// Conexión al servidor
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const firebase = pgPromise()(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/postgres`);
console.log(firebase);
// Creación de tablas
const setupDb = async () => {
    await firebase.none(`  
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
      title VARCHAR(50) NOT NULL,
      author VARCHAR(30) NOT NULL,
      genre VARCHAR(15) NOT NULL,
      publication_date DATE NOT NULL,
      isbn VARCHAR(10) NOT NULL UNIQUE
    );
  `);
    // Introducción de datos en las tablas
    await firebase.none(`
  INSERT INTO users 
  (username, password, email)
  VALUES
  ('Marcos', 'asd123', 'testing@test.com');      
  `);
    await firebase.none(`
  INSERT INTO books
  (title, author, genre, publication_date, isbn)
  VALUES 
  ('Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 'Fantasy', '10/05/1997', '0590358324');
  `);
};
setupDb();
export { firebase };
//# sourceMappingURL=firebase.js.map