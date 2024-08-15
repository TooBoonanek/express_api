import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "../prisma/prisma.js";

const jwtPassport = passport.use(new Strategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
}, async (req, payload, done) => {
    await prisma.user.findUnique({
        where: {
            userId: payload.userId,
            email: payload.email
        }
    }).then( user => {
        if (!user) return done(null, false);
        return done(null, user);
    })
    .catch( err => done(err, false));
}));

export default jwtPassport;