const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },

  name: String,
  startDate: Date,
  endDate: Date,

  isActive: Boolean
});

module.exports = mongoose.model("AcademicYear", academicYearSchema);
