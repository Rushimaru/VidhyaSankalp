const mongoose = require("mongoose");

const facultyProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },

  qualification: String,
  experienceYears: Number,

  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],

  salaryStructure: Object,
  joiningDate: Date
});

module.exports = mongoose.model("FacultyProfile", facultyProfileSchema);
