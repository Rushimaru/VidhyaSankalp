const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    /* Academic */
    academicYear:      { type: String, required: [true, 'Academic year is required'] },
    classSelection:    { type: String, required: [true, 'Class is required'] },
    section:           { type: String, required: [true, 'Section is required'] },
    rollNumber:        { type: String, default: '' },
    admissionNo:       { type: String, required: [true, 'Admission number is required'], unique: true, trim: true },

    /* Personal */
    fullName:          { type: String, required: [true, 'Full name is required'], trim: true },
    gender:            { type: String, required: [true, 'Gender is required'], enum: ['Male', 'Female', 'Other'] },
    dateOfBirth:       { type: Date,   required: [true, 'Date of birth is required'] },
    category:          { type: String, required: [true, 'Category is required'], enum: ['General','OBC','SC','ST','EWS','NT','SBC'] },
    religion:          { type: String, required: [true, 'Religion is required'] },
    caste:             { type: String, default: '' },
    motherTongue:      { type: String, required: [true, 'Mother tongue is required'] },
    nationality:       { type: String, required: [true, 'Nationality is required'], default: 'Indian' },
    phoneNumber:       { type: String, required: [true, 'Mobile number is required'], match: [/^\d{10}$/, 'Enter valid 10-digit mobile number'] },
    studentEmail:      { type: String, default: '', match: [/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter valid email'] },
    aadharNumber:      { type: String, default: '', match: [/^$|^\d{12}$/, 'Aadhar must be 12 digits'] },

    /* Father */
    fathersName:       { type: String, default: '' },
    fathersPhone:      { type: String, default: '' },
    fathersOccupation: { type: String, default: '' },
    fathersAadhar:     { type: String, default: '' },

    /* Mother */
    mothersName:       { type: String, default: '' },
    mothersPhone:      { type: String, default: '' },
    mothersOccupation: { type: String, default: '' },
    mothersAadhar:     { type: String, default: '' },

    /* Guardian */
    guardianType:      { type: String, enum: ['father', 'mother', 'other'], default: 'father' },
    guardianName:      { type: String, default: '' },
    guardianRelation:  { type: String, default: '' },
    guardianEmail:     { type: String, default: '' },
    guardianPhone:     { type: String, default: '' },
    guardianAddress:   { type: String, default: '' },

    /* Medical */
    bloodGroup:        { type: String, default: '', enum: ['','A+','A-','B+','B-','AB+','AB-','O+','O-'] },
    height:            { type: String, default: '' },
    weight:            { type: String, default: '' },
    medicalCondition:  { type: String, default: '' },

    /* Address */
    currentAddress:    { type: String, required: [true, 'Current address is required'] },
    permanentAddress:  { type: String, default: '' },

    /* Previous School */
    prevSchoolName:    { type: String, default: '' },
    prevClass:         { type: String, default: '' },
    prevBoard:         { type: String, default: '' },
    prevPassYear:      { type: String, default: '' },
    prevPercentage:    { type: String, default: '' },
    prevTCNumber:      { type: String, default: '' },

    /* Transport */
    busRoute:          { type: String, default: '' },
    stopName:          { type: String, default: '' },

    /* Misc */
    details:           { type: String, default: '' },

    /* Login */
    loginEmail:        { type: String, required: [true, 'Login email is required'], unique: true, trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter valid login email'] },
    password:          { type: String, required: [true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters'] },
  },
  {
    timestamps: true,   
    versionKey: false,
  }
);

/* ── Indexes for fast lookup ─── */
studentSchema.index({ admissionNo: 1 });
studentSchema.index({ fullName: 'text', admissionNo: 'text' });

module.exports = mongoose.model('Student', studentSchema);