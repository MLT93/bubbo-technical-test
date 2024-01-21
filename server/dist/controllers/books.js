import joi from "joi";
import { firebase } from "./../firebase.js";
const bookScheme = joi.object({
    id: joi.number().integer(),
    title: joi.string().required(),
    author: joi.string().required(),
    genre: joi.string().required(),
    publication_date: joi.string().required(),
    isbn: joi.string().required(),
});
const getAll = async (req, res) => {
    const books = await firebase.many(`SELECT * FROM books;`);
    res.status(200).json(books);
};
const getOneById = async (req, res) => {
    const { id } = req.params;
    const book = await firebase.oneOrNone(`SELECT * FROM books WHERE book_id=$1;`, Number(id));
    res.status(200).json(book);
};
const create = async (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    const newBook = {
        title: title,
        author: author,
        genre: genre,
        publication_date: publication_date,
        isbn: isbn,
    };
    const validateNewBook = bookScheme.validate(newBook);
    if (validateNewBook.error) {
        return res
            .status(404)
            .json({ msg: validateNewBook.error.details[0].message });
    }
    else {
        await firebase.none(`INSERT INTO books (title, author, genre, publication_date, isbn) VALUES ($1, $2, $3, $4, $5)`, [title, author, genre, publication_date, isbn]);
        res.status(201).json({ msg: "The book was created" });
    }
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publication_date, isbn } = req.body;
    await firebase.none(`UPDATE books SET title=$2, author=$3, genre=$4, publication_date=$5, isbn=$6 WHERE book_id=$1`, [id, title, author, genre, publication_date, isbn]);
    res.status(200).json({ msg: "The book was updated" });
};
const deleteById = async (req, res) => {
    const { id } = req.params;
    await firebase.none(`DELETE FROM books WHERE book_id=$1`, Number(id));
    res.status(200).json({ msg: "The book was deleted" });
};
/* const createImage = async (req: Request, res: Response) => {
  res.status(201).json({ msg: "Book image uploaded successfully" });
}; */
export { getAll, getOneById, create, updateById, deleteById /* createImage */ };
//# sourceMappingURL=books.js.map