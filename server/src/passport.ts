import "dotenv/config";
import passport from "passport";
import passportJWT from "passport-jwt";
import { firebase } from "./firebase.js";

const { SECRET } = process.env;

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = firebase.one(`SELECT * FROM users WHERE user_id=$1`, payload.id);

      try {
        return user ? done(null, user) : done(new Error(`User not found.`));
      } catch (error) {
        done(error);
      }
    }
  )
);
