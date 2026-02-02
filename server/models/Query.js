 const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  subject: String,
  message: String,

  attachments: [String],

  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
    default: "OPEN"
  },

  replies: [{
    repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    repliedAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model("Query", querySchema);
