import express from 'express';
import { getAllPosts } from '../controller/all.js';

const router = express.Router();

router.get('/', getAllPosts);

export default router;