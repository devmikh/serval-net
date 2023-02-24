import express from 'express';
import { createUser } from '../services/userService';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'this is /api route'});
})

router.post('/register', async (req, res) => {
    await createUser(req.body);
    res.json({ status: "success"});
});

export default router;