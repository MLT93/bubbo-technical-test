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
const { GoogleAuth } = require('google-auth-library');
/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
async function main() {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
    const res = await client.request({ url });
    console.log(res.data);
}
main().catch(console.error);
//# sourceMappingURL=authorization.js.map