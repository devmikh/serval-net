import express from 'express';
import moment from 'moment';

import { createPost } from '../services/post';

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

export default router;