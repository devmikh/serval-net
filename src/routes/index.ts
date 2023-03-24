import express from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import postsRoutes from './posts';

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', usersRoutes);
router.use('/api', postsRoutes);

export default router;