import jwtPassport from "./JwtAuth.js";

const ProtectRoute = jwtPassport.authenticate('jwt', { session: false });

const requireSignIn = (req, res, next) => {
    jwtPassport.authenticate('jwt', { session: false },  (err, user, info) => {
        if (err || !user) return res.status(401).json({message: 'ต้องล็อกอินก่อน'})
        return next();
    })(req, res, next);
}

export { ProtectRoute, requireSignIn };