import express from 'express';
import {getHistory, getHistoryByQuery, getHistoryById, createHistory, updateHistory, deleteHistory} from '../controller/history.js';

const router = express.Router();

router.get('/', getHistory);
router.get('/search', getHistoryByQuery);
router.get(`/find/:id`, getHistoryById);
router.post('/', createHistory);
router.patch('/:id', updateHistory);
router.delete('/:id', deleteHistory);

export default router;