import express from 'express';
import authRoutes from './auth';
import postsRoutes from './posts';

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', postsRoutes);

export default router;