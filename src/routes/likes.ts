import express from 'express';
import { likePost } from '../services/likes';

const router = express.Router();

router.post('/like/:id', async (req: any, res) => {
    if (req.user && req.isAuthenticated()) {
        const result = await likePost(req.user.id, req.params.id);
        if (result.error) {
            res.status(500).json({result});
        } else {
            res.status(200).json({result});
        }
    }
});

export default router;