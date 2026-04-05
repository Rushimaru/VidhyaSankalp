import mongoose from 'mongoose';

const academicYearSchema = new mongoose.Schema(
  {
    institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    name:        { type: String, required: true, trim: true }, // e.g. "2024-25"
    startDate:   { type: Date, required: true },
    endDate:     { type: Date, required: true },
    isCurrent:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Only one academic year can be current per institution
academicYearSchema.index({ institution: 1, isCurrent: 1 });

const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);
export default AcademicYear;
