import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";
import { logIn, signUp, logOut } from "./controllers/users.js";
import { authorization } from "./authentication.js";
import "./passport.js";
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
} from "./controllers/books.js";
import cors from "cors";

// Starting server
const app = express();
// Middlewares
app.use(morgan(`dev`));
app.use(express.json());
app.use(cors());
// User authentication
app.post("/postgres/users/login", logIn);
app.post("/postgres/users/signup", signUp);
app.get("/postgres/users/logout", authorization, logOut);
// Test CRUD
app.get("/postgres/books", getAll);
app.get("/postgres/books/:id", getOneById);
app.post("/postgres/books", create);
app.put("/postgres/books/:id", updateById);
app.delete("/postgres/books/:id", deleteById);
// Firebase CRUD
app.get("/books", getAll);
app.get("/books/:id", getOneById);
app.post("/books", create);
app.put("/books/:id", updateById);
app.delete("/books/:id", deleteById);

// Listen port
let PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
