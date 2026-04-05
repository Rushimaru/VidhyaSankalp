import express from 'express';
import { listMaterials, uploadMaterial, deleteMaterial } from '../controllers/materialController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';
import upload, { setUploadDir } from '../middleware/upload.js';

const router = express.Router();

router.get('/', protect, listMaterials);
router.post('/',
  protect,
  requireRole('faculty', 'admin', 'superadmin'),
  setUploadDir('materials'),
  upload.single('file'),
  uploadMaterial
);
router.delete('/:id', protect, requireRole('faculty', 'admin', 'superadmin'), deleteMaterial);

export default router;
