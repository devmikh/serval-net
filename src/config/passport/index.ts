import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import User from "../../models/userModel";

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({where: {email: username}})
        .then((user) => {
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            // validate password
            // if password not correct
            // return done(null, false, { message: "Incorrect password" });
            return done(null, user);
        })
        .catch(error => done(error));
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
});