import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema(
  {
    institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    class:        { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section:      { type: String }, // null means all sections
    subject:      { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    uploadedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:        { type: String, required: true, trim: true },
    description:  { type: String },
    fileUrl:      { type: String, required: true },
    fileName:     { type: String, required: true },
    fileType:     { type: String, enum: ['pdf', 'image'], required: true },
    fileSize:     { type: Number }, // in bytes
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
export default StudyMaterial;
