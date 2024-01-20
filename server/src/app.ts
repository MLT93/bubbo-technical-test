import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";

export const app = express();

app.use(morgan(`dev`));
