import express from 'express';
import { fetchUser } from '../services/user';
const router = express.Router();

router.get('/users/:id', async (req, res) => {
    const result = await fetchUser(Number(req.params.id));
    if (!result.error) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result)
    }
});

export default router;