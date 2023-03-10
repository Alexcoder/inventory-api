import express from 'express';
import {getDashboard, createDashboard, deleteDashboard } from '../controller/dashboard.js';
// , getDashboardByQuery
const router = express.Router();


router.get('/', getDashboard);
// router.get('/find', getDashboardByQuery);
router.post('/', createDashboard);
router.put('/', deleteDashboard);


export default router;