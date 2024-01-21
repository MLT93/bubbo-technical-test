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
//# sourceMappingURL=authorization.js.map