import express from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import postsRoutes from './posts';
import likesRoutes from './likes';

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', usersRoutes);
router.use('/api', postsRoutes);
router.use('/api', likesRoutes);

export default router;