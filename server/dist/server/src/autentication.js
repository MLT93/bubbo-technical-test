import passport from "passport";
const authorization = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, username) => {
        if (!username || err) {
            res.status(401).json({ msg: `Unauthorized.` });
        }
        else {
            req.user = username;
            next();
        }
    })(req, res, next);
};
export { authorization };
/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
/* async function main() {
  const auth = new GoogleAuth({
    scopes: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjv_uUlf3Am-pxMklf_vR_vOf-rH6NcgY",
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = `https://console.firebase.google.com/project/${projectId}`;
  const res = await client.request({ url });
  console.log(res.data);
}

main().catch(console.error); */
//# sourceMappingURL=autentication.js.map