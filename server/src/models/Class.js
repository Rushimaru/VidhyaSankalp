import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    institution:   { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    academicYear:  { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    name:          { type: String, required: true, trim: true }, // e.g. "Class 10" or "Year 1"
    sections:      [{ type: String, trim: true }],               // e.g. ["A", "B", "C"]
    classTeacher:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

classSchema.index({ institution: 1, academicYear: 1, name: 1 }, { unique: true });

const Class = mongoose.model('Class', classSchema);
export default Class;
