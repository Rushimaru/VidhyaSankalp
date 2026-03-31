 import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const teacherSchema = new mongoose.Schema(
  {
    // ── School Reference
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // ── Identity
    employeeId:  { type: String, required: true, trim: true },
    fullName:    { type: String, required: true, trim: true },
    gender:      { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date, required: true },
    category:    { type: String, required: true, enum: ['General','OBC','SC','ST','EWS','NT','SBC'] },
    religion:    { type: String, required: true },
    caste:       { type: String },
    nationality: { type: String, required: true, default: 'Indian' },
    aadharNumber: { type: String },
    panNumber:   { type: String },
    maritalStatus: { type: String, enum: ['Married','Unmarried','Divorced','Widowed'] },

    // ── Professional
    designation:    { type: String, required: true },   // e.g. PGT, TGT, PRT, Lecturer
    department:     { type: String, required: true },   // e.g. Science, Commerce, Arts
    subjectsTaught: [{ type: String }],                 // array of subjects
    classesAssigned: [{ type: String }],                // array of classes
    qualification:  { type: String, required: true },   // B.Ed, M.Ed, B.Sc, etc.
    experience:     { type: String, required: true },   // e.g. "5 years"
    contractType:   { type: String, enum: ['Regular','Contractual','Guest','Part-Time'] },
    joinDate:       { type: Date, required: true },
    workLocation:   { type: String },

    // ── Contact
    phoneNumber:      { type: String, required: true },
    alternatePhone:   { type: String },
    email:            { type: String, required: true },

    // ── Family
    fathersName: { type: String },
    mothersName: { type: String },
    spouseName:  { type: String },
    emergencyContactName:   { type: String },
    emergencyContactPhone:  { type: String },
    emergencyContactRelation: { type: String },

    // ── Address
    currentAddress:   { type: String, required: true },
    permanentAddress: { type: String },

    // ── Medical
    bloodGroup: { type: String },
    medicalCondition: { type: String },

    // ── Bank (for salary)
    bankAccountNumber: { type: String },
    bankName:          { type: String },
    ifscCode:          { type: String },
    panForSalary:      { type: String },

    // ── Previous Employment
    prevInstituteName:    { type: String },
    prevInstituteAddress: { type: String },
    prevDesignation:      { type: String },
    prevExperienceYears:  { type: String },

    // ── Remarks
    remarks: { type: String },

    // ── Login
    loginEmail: { type: String, required: true, unique: true, lowercase: true },
    password:   { type: String, required: true },
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Unique employeeId per school
teacherSchema.index({ employeeId: 1, schoolId: 1 }, { unique: true });

teacherSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

teacherSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
    this.setUpdate(update);
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;