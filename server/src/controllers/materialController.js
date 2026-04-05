import StudyMaterial from '../models/StudyMaterial.js';
import path from 'path';

// ── GET /api/materials
export const listMaterials = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId, isActive: true };
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.class) filter.class = req.query.class;
    const materials = await StudyMaterial.find(filter)
      .populate('subject', 'name')
      .populate('class', 'name')
      .populate('uploadedBy', 'name')
      .sort('-createdAt');
    res.json(materials);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── POST /api/materials  (multer sends file as req.file)
export const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
    const { title, description, subject, class: classId, section, academicYear } = req.body;
    if (!title || !subject || !classId) {
      return res.status(400).json({ message: 'title, subject and class are required.' });
    }
    const ext = path.extname(req.file.originalname).toLowerCase();
    const fileType = ext === '.pdf' ? 'pdf' : 'image';
    const fileUrl = `/uploads/materials/${req.file.filename}`;

    const material = await StudyMaterial.create({
      institution: req.user.institutionId,
      academicYear, class: classId, section: section || null,
      subject, uploadedBy: req.user._id,
      title, description, fileUrl,
      fileName: req.file.originalname,
      fileType, fileSize: req.file.size,
    });
    res.status(201).json(material);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── DELETE /api/materials/:id
export const deleteMaterial = async (req, res) => {
  try {
    await StudyMaterial.findOneAndUpdate(
      { _id: req.params.id, institution: req.user.institutionId },
      { isActive: false }
    );
    res.json({ message: 'Material removed.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
