import express from 'express';
import {getPosts, getPost, createPost, updatePost, deletePost} from '../controller/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get(`/:id`, getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;