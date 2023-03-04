import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import User from "../../models/userModel";
import { validatePassword } from "../../../utils/passwordUtils";

// Define passport local strategy
passport.use(new LocalStrategy({ usernameField: 'email'}, (username, password, done) => {
    User.findOne({where: {email: username}})
        .then(async (user) => {
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const validPassword = await validatePassword(password, user.password);
            if (!validPassword) {
                return done(null, false, { message: "Incorrect password" });
            } else {
                return done(null, user);
            }
            
        })
        .catch(error => done(error));
}));

passport.serializeUser((user: any, done) => {
    console.log("inside serialize, done: ", done)
    done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
    console.log("inside deserialize")
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
});

export default passport;