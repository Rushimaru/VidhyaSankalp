import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  student:     { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fileUrl:     { type: String, required: true },
  fileName:    { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  grade:       { type: String },
  remarks:     { type: String },
}, { timestamps: false });

const assignmentSchema = new mongoose.Schema(
  {
    institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    class:        { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section:      { type: String },
    subject:      { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:        { type: String, required: true, trim: true },
    description:  { type: String },
    dueDate:      { type: Date, required: true },
    maxMarks:     { type: Number, default: 100 },
    submissions:  [submissionSchema],
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
