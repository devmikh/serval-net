import express from 'express';
import authRoutes from './auth';
import postRoutes from './post';

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', postRoutes);

export default router;