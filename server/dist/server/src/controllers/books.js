import joi from "joi";
import { test_firebase } from "../database.js";
import { db } from "../database.js";
const bookScheme = joi.object({
    id: joi.number().integer(),
    title: joi.string().required(),
    author: joi.string().required(),
    genre: joi.string().required(),
    publication_date: joi.string().required(),
});
const getAll = async (req, res) => {
    const books = await test_firebase.many(`SELECT * FROM books;`);
    const querySnapshot = (await db.collection("library").get()).docs;
    const firebaseData = querySnapshot.map((doc) => ({
        book_id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
        genre: doc.data().genre,
        publication_date: doc.data().date,
    }));
    console.log(firebaseData);
    res.status(200).json({ postgres: books, firebase: firebaseData });
};
const getOneById = async (req, res) => {
    const { id } = req.params;
    const book = await test_firebase.oneOrNone(`SELECT * FROM books WHERE book_id=$1;`, Number(id));
    res.status(200).json(book);
};
const create = async (req, res) => {
    const { title, author, genre, publication_date } = req.body;
    const newBook = {
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
    }
    else {
        await test_firebase.none(`INSERT INTO books (title, author, genre, publication_date) VALUES ($1, $2, $3, $4)`, [title, author, genre, publication_date]);
        res.status(201).json({ msg: "The book was created" });
    }
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publication_date } = req.body;
    await test_firebase.none(`UPDATE books SET title=$2, author=$3, genre=$4, publication_date=$5 WHERE book_id=$1`, [id, title, author, genre, publication_date]);
    res.status(200).json({ msg: "The book was updated" });
};
const deleteById = async (req, res) => {
    const { id } = req.params;
    await test_firebase.none(`DELETE FROM books WHERE book_id=$1`, Number(id));
    res.status(200).json({ msg: "The book was deleted" });
};
/* const createImage = async (req: Request, res: Response) => {
  res.status(201).json({ msg: "Book image uploaded successfully" });
}; */
export { getAll, getOneById, create, updateById, deleteById /* createImage */ };
//# sourceMappingURL=books.js.map