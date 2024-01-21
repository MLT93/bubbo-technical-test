import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";
import { logIn, signUp, logOut } from "./controllers/users.js";
import { authorization } from "./authorization.js";
import "./passport.js";
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
} from "./controllers/books.js";

// starting server
const app = express();

// middlewares
app.use(morgan(`dev`));
app.use(express.json());

// user authentication
app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.get("/api/users/logout", authorization, logOut);

// CRUD
app.get("/api/books", getAll);
app.get("/api/books/:id", getOneById);
app.post("/api/books", create);
app.put("/api/books/:id", updateById);
app.delete("/api/books/:id", deleteById);

// listen port
const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
