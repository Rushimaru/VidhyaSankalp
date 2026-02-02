const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  title: String,
  fileUrl: String,

  viewsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
