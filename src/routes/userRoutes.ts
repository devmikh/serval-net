import express from 'express';
import { createUser } from '../services/userService';
import { validatePassword } from '../../utils/passwordUtils';
import passport from '../config/passport';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'this is /api route' });
});

router.post('/register', async (req, res) => {
    try {
        await createUser(req.body);
        res.status(200).json({ status: 'success' });
    } catch(error: any) {
        res.status(500).json({ error: error.message });
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
          return res.status(200).json({ status: 'success'});
        });
      })(req, res, next);
});

export default router;