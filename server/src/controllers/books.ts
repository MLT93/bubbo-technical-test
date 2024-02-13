import { Request, Response } from "express";
import joi from "joi";
import { test_firebase } from "../database.js";
import { db } from "../database.js";

type Book = {
  book_id?: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
};

const bookScheme = joi.object({
  id: joi.number().integer(),
  title: joi.string().required(),
  author: joi.string().required(),
  genre: joi.string().required(),
  publication_date: joi.string().required(),
});

const getAll = async (req: Request, res: Response) => {
  const books = await test_firebase.many(`SELECT * FROM books;`);
  const querySnapshot = (await db.collection("library").get()).docs;
  const firebaseData = querySnapshot.map((doc) => ({
    book_id: doc.id,
    ...doc.data(),
  }));
  console.log({ postgres: books, firebase: firebaseData });
  res.status(200).json({ postgres: books, firebase: firebaseData });
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await test_firebase.oneOrNone(
    `SELECT * FROM books WHERE book_id=$1;`,
    Number(id)
  );

  const doc = await db.collection("library").doc(id).get();

  res
    .status(200)
    .json({ postgres: book, firebase: { book_id: doc.id, ...doc.data() } });
};

const create = async (req: Request, res: Response) => {
  const { title, author, genre, publication_date } = req.body;
  const newBook: Book = {
    title: title,
    author: author,
    genre: genre,
    publication_date: publication_date,
  };

  const validateNewBook = bookScheme.validate(newBook);
  if (validateNewBook.error) {
    return res
      .status(404)
      .json({ msg: validateNewBook.error.details[0].message });
  } else {
    await test_firebase.none(
      `INSERT INTO books (title, author, genre, publication_date) VALUES ($1, $2, $3, $4)`,
      [title, author, genre, publication_date]
    );

    res.status(201).json({ msg: "The book was created" });
  }

  await db.collection("library").add({
    ...newBook,
  });
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, genre, publication_date } = req.body;
  await test_firebase.none(
    `UPDATE books SET title=$2, author=$3, genre=$4, publication_date=$5 WHERE book_id=$1`,
    [id, title, author, genre, publication_date]
  );

  await db.collection("library").doc(id).update(req.body);

  res.status(200).json({ msg: "The book was updated" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await test_firebase.none(`DELETE FROM books WHERE book_id=$1`, Number(id));

  await db.collection("library").doc(id).delete();

  res.status(200).json({ msg: "The book was deleted" });
};

/* const createImage = async (req: Request, res: Response) => {
  res.status(201).json({ msg: "Book image uploaded successfully" });
}; */

export { getAll, getOneById, create, updateById, deleteById /* createImage */ };
