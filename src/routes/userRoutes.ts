import express from 'express';
import { createUser } from '../services/userService';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'this is /api route' });
})

router.post('/register', async (req, res) => {
    try {
        await createUser(req.body);
        res.status(200).json({ status: "success" });
    } catch(error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;