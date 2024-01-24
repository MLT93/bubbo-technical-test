import { Request, Response } from "express";
import { firebase } from "../database.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const logIn = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const user = await firebase.one(`SELECT * FROM users WHERE username=$1`, [
    username,
    email,
  ]);

  if (user && user.password === password) {
    const payload = {
      user_id: user.id,
      username: user.username,
    };
    const { SECRET = "" } = process.env;
    const token = jwt.sign(payload, SECRET);

    await firebase.none(`UPDATE users SET token=$2 WHERE user_id=$1`, [
      user.id,
      token,
    ]);
    res.status(200).json({
      user_id: user.id,
      username: user.username,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).json({ msg: `Username or Password incorrect` });
  }
};

const signUp = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const user = await firebase.oneOrNone(
    `SELECT * FROM users WHERE username=$1`,
    username
  );

  if (user) {
    res.status(409).json({ msg: `Username already exist` });
  } else {
    const { id } = await firebase.one(
      `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING user_id`,
      [username, password, email]
    );
    res.status(201).json({ id: id, msg: `User create successfully` });
  }
};

const logOut = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;
  await firebase.none(`UPDATE users SET token=$2 WHERE user_id=$1`, [user?.id, null]);
  res.status(200).json({ msg: `Logout successful` });
};

export { logIn, signUp, logOut };
