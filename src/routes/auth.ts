import express from 'express';

import { createUser, fetchUser } from '../services/user';
import passport from '../config/passport';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/* ROUTES */

// Check if user is authenticated and send user object back
router.get('/is-authenticated', async (req, res) => {
    if (req.isAuthenticated()) {
        const result = await fetchUser(JSON.parse(req.cookies.user).id);
        res.status(200).json({ ...result, authenticated: true,  });
    } else {
        res.status(200).json({ authenticated: false });
    }
});

// Check if user is authorized
router.get('/is-authorized', async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ authorized: true });
    } else {
        res.status(401).json({ authorized: false });
    }
});

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
            res.status(200).json({ status: 'success', message: 'registration_success', user: result.newUser });
        })
    } else if (result && !result.newUser) {
        if (result.error === 'duplicate_email' || result.error === 'duplicate_username') {
            res.status(409).json({ error: result.error });
        } else {
            res.status(500).json({ error: result.error });
        }
        
    }
    
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: "invalid_credentials"});
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.cookie('user', JSON.stringify({ id: user.id }), {
                maxAge: 1000 * 60 * 60 * 24
            });
            return res.status(200).json({ status: 'success', user });
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