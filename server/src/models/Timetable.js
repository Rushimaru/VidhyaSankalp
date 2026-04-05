import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  day:       { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], required: true },
  period:    { type: Number, required: true }, // e.g. 1, 2, 3...
  startTime: { type: String, required: true }, // "09:00"
  endTime:   { type: String, required: true }, // "09:45"
  subject:   { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  teacher:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room:      { type: String },
}, { _id: false });

const timetableSchema = new mongoose.Schema(
  {
    institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    class:        { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section:      { type: String, required: true },
    slots:        [slotSchema],
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

timetableSchema.index({ institution: 1, class: 1, section: 1, academicYear: 1 }, { unique: true });

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;
