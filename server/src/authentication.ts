import { Request, Response, NextFunction } from "express";
import passport from "passport";
/* import { GoogleAuth } from "google-auth-library"; */

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

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
/* async function main() {
  const auth = new GoogleAuth({
    scopes: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = `https://console.firebase.google.com/project/${projectId}`;
  const res = await client.request({ url });
  console.log(res.data);
}

main().catch(console.error); */

