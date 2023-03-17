import express from 'express';

import { createUser, findUser } from '../services/user';
import passport from '../config/passport';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/* ROUTES */

// Check if user is authenticated and send user object back
router.get('/is-authenticated', async (req, res) => {
    if (req.isAuthenticated()) {
        const user = await findUser(JSON.parse(req.cookies.user).id);
        res.status(200).json({ authenticated: true, user });
    } else {
        res.status(401).json({ authenticated: false, user: null });
    }
})

// Register new user
router.post('/register', async (req, res, next) => {
    
    const result = await createUser(req.body);
    if (result && result.newUser) {
        req.logIn(result.newUser, (err) => {
            if (err) {
                return next(err);
            }
            res.cookie('user', JSON.stringify({ id: result.newUser.id }), {
                maxAge: 1000 * 60 * 60 * 24
            });
            res.status(200).json({ status: 'success', message: 'registration_success' });
        })
    } else if (result && !result.newUser) {
        res.status(500).json({ error: result.error });
    }
    
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password"});
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.cookie('user', JSON.stringify({ id: user.id }), {
                maxAge: 1000 * 60 * 60 * 24
            });
            return res.status(200).json({ status: 'success'});
        });
      })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { console.log(err); return next(err); }
        res.status(200).json({ status: 'success'});
      });
});

export default router;