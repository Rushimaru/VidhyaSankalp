const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },

  enrollmentNo: String,
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },

  parentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  aadhaarVerified: Boolean,

  documents: [{
    type: String,
    fileUrl: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
