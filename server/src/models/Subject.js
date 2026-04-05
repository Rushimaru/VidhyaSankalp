import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    class:        { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    name:         { type: String, required: true, trim: true },
    code:         { type: String, trim: true },
    teacher:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // faculty userId
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
