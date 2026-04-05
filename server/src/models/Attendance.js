import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  status:  { type: String, enum: ['P', 'A', 'L', 'HD'], required: true }, // Present/Absent/Late/Half-day
}, { _id: false });

const attendanceSchema = new mongoose.Schema(
  {
    institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    class:        { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section:      { type: String, required: true },
    subject:      { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }, // optional
    date:         { type: Date, required: true },
    markedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    records:      [attendanceRecordSchema],
  },
  { timestamps: true }
);

// One attendance per class+section+date (optionally per subject)
attendanceSchema.index({ institution: 1, class: 1, section: 1, date: 1, subject: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
