import express from 'express';
import moment from 'moment';

import { createPost, getUserPosts } from '../services/post';

const router = express.Router();

// test route (TO BE REMOVED)
router.get('/newPost', async (req, res) => {
    const result = await createPost({
        user_id: 1,
        date: moment().valueOf(),
        text: "sample post text"
    });
    res.send(result);
});

router.get('/users/:id/posts', async (req, res) =>  {
    const result = await getUserPosts(Number(req.params.id));
    if (!result.error) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
   
});

export default router;