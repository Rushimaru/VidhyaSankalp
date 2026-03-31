import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema(
  {
    // ── School Reference
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // ── Academic
    academicYear:  { type: String, required: true },
    classSection:  { type: String, required: true },
    section:       { type: String, required: true },
    rollNumber:    { type: String },
    admissionNo:   { type: String, required: true, trim: true },

    // ── Personal
    fullName:      { type: String, required: true, trim: true },
    gender:        { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth:   { type: Date, required: true },
    category:      { type: String, required: true, enum: ['General','OBC','SC','ST','EWS','NT','SBC'] },
    religion:      { type: String, required: true },
    caste:         { type: String },
    motherTongue:  { type: String, required: true },
    nationality:   { type: String, required: true, default: 'Indian' },
    phoneNumber:   { type: String, required: true },
    studentEmail:  { type: String },
    aadharNumber:  { type: String },
    photo:         { type: String },

    // ── Parents
    fathersName:       { type: String, required: true },
    fathersPhone:      { type: String, required: true },
    fathersOccupation: { type: String },
    mothersName:       { type: String, required: true },
    mothersPhone:      { type: String },
    mothersOccupation: { type: String },

    // ── Guardian
    primaryGuardian:  { type: String, enum: ['father','mother','other'], default: 'father' },
    guardianName:     { type: String },
    guardianRelation: { type: String },
    guardianPhone:    { type: String },
    guardianEmail:    { type: String },

    // ── Address
    currentAddress:   { type: String, required: true },
    permanentAddress: { type: String },

    // ── Medical
    bloodGroup:       { type: String },
    height:           { type: String },
    weight:           { type: String },
    medicalCondition: { type: String },

    // ── Previous School
    prevSchoolName:  { type: String },
    prevClass:       { type: String },
    prevBoard:       { type: String },
    prevPassYear:    { type: String },
    prevPercentage:  { type: String },
    prevTCNumber:    { type: String },

    // ── Transport
    busRoute:  { type: String },
    stopName:  { type: String },

    // ── Remarks
    remarks: { type: String },

    // ── Login
    loginEmail: { type: String, required: true, unique: true, lowercase: true },
    password:   { type: String, required: true },
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Unique admissionNo per school
studentSchema.index({ admissionNo: 1, schoolId: 1 }, { unique: true });

studentSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;