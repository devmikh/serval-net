import express from 'express';
import moment from 'moment';

import { createPost, getUserPosts } from '../services/posts';

const router = express.Router();

router.post('/createPost', async (req: any, res) => {
    if (req.user && req.isAuthenticated) {
        const result = await createPost({
            user_id: req.user.id,
            date: moment().valueOf(),
            text: req.body.text
        });
        if (!result.error) {
            res.status(200).json({ result });
        } else {
            res.status(500).json({ result });
        }
    } else {
        res.status(401).json({ authorized: false });
    }
});

router.get('/users/:id/posts', async (req, res) =>  {
    const result = await getUserPosts(Number(req.params.id));
    if (!result.error) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result)
    }
   
});

export default router;