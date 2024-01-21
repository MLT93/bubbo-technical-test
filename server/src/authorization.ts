import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authorization = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, username: string) => {
      if (!username || err) {
        res.status(401).json({ msg: `Unauthorized.` });
      } else {
        req.user = username;
        next();
      }
    }
  )(req, res, next);
};

export { authorization };
