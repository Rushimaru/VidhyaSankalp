import express from 'express';
import {
  getStats, listInstitutions, getInstitution, createInstitution,
  updateInstitution, toggleInstitutionStatus,
  listPayments, recordPayment, updatePayment,
  listPlans, createPlan, upsertPlan,
} from '../controllers/superAdminController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();
const isSuperAdmin = [protect, requireRole('superadmin')];

// Stats
router.get('/stats', ...isSuperAdmin, getStats);

// Institutions
router.get('/institutions', ...isSuperAdmin, listInstitutions);
router.get('/institutions/:id', ...isSuperAdmin, getInstitution);
router.post('/institutions', ...isSuperAdmin, createInstitution);
router.put('/institutions/:id', ...isSuperAdmin, updateInstitution);
router.patch('/institutions/:id/toggle', ...isSuperAdmin, toggleInstitutionStatus);

// Payments
router.get('/payments', ...isSuperAdmin, listPayments);
router.post('/payments', ...isSuperAdmin, recordPayment);
router.put('/payments/:id', ...isSuperAdmin, updatePayment);

// Subscription Plans
router.get('/plans', ...isSuperAdmin, listPlans);
router.post('/plans', ...isSuperAdmin, createPlan);
router.put('/plans/:id', ...isSuperAdmin, upsertPlan);

export default router;
