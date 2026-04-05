import express from 'express';
import { listFees, createFee, collectFee, updateFee, deleteFee, feesSummary } from '../controllers/feeController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();
const isAdmin = [protect, requireRole('superadmin', 'admin')];

router.get('/', protect, listFees);
router.get('/summary', protect, feesSummary);
router.post('/', ...isAdmin, createFee);
router.put('/:id/collect', ...isAdmin, collectFee);
router.put('/:id', ...isAdmin, updateFee);
router.delete('/:id', ...isAdmin, deleteFee);

export default router;
