import { Request, Response } from "express";
import { test_firebase } from "../database.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
const firePassword = "123123123";
const fireEmail = "asd@123.com";
const { API_KEY } = process.env;
const urlLogIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

const logIn = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const user = await test_firebase.one(
    `SELECT * FROM users WHERE username=$1`,
    [username, email]
  );

  // LogIn with email and password with API_KEY Firebase https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}
  signInWithEmailAndPassword(auth, fireEmail, firePassword)
    .then((userCredential) => {
      const fireUser = userCredential.user;
      alert(`You are logged! \n\n ${fireUser}`);
      console.log(fireUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode}: ${errorMessage}`);
    });

  if (user && user.password === password) {
    const payload = {
      user_id: user.id,
      username: user.username,
    };
    const { SECRET = "" } = process.env;
    const token = jwt.sign(payload, SECRET);

    await test_firebase.none(`UPDATE users SET token=$2 WHERE user_id=$1`, [
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
  const user = await test_firebase.oneOrNone(
    `SELECT * FROM users WHERE username=$1`,
    username
  );

  // SignUp Authentication with user created with API_KEY Firebase https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}
  // Read this web to generate your user, password and idToken https://firebase.google.com/docs/reference/rest/auth/?hl=es-419#section-create-email-password
  // Use Postman to make easy
  createUserWithEmailAndPassword(auth, fireEmail, firePassword)
    .then((userCredential) => {
      const fireUser = userCredential.user;
      alert(`You are logged! \n\n ${fireUser}`);
      console.log(fireUser);

      if (fireUser) {
        res.status(409).json({ msg: `User already exist` });
      } else {
        res.status(201).json({ msg: `You have been create new user` });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode}: ${errorMessage}`);
      res
        .status(404)
        .json({
          msg: `ATTENTION: ${errorCode} We have an error. ${errorMessage} `,
        });
    });

  if (user) {
    res.status(409).json({ msg: `Username already exist` });
  } else {
    const { id } = await test_firebase.one(
      `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING user_id`,
      [username, password, email]
    );
    res.status(201).json({ id: id, msg: `User create successfully` });
  }
};

const logOut = async (req: Request, res: Response) => {
  const user: any = req.user;
  await test_firebase.none(`UPDATE users SET token=$2 WHERE user_id=$1`, [
    user?.id,
    null,
  ]);
  res.status(200).json({ msg: `Logout successful` });
};

export { logIn, signUp, logOut };
