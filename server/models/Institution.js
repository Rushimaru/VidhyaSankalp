const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["School", "College", "Tuition"] },

  address: String,
  contactEmail: String,
  contactPhone: String,

  kycDocuments: [{
    type: { type: String },
    fileUrl: String,
    verified: { type: Boolean, default: false }
  }],

  status: {
    type: String,
    enum: ["ACTIVE", "SUSPENDED", "TRIAL"],
    default: "TRIAL"
  },

  trialEndsAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Institution", institutionSchema);
