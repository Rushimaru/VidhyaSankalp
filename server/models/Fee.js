const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },

  feeType: {
    type: String,
    enum: ["ACADEMIC", "HOSTEL", "TRANSPORT"]
  },

  totalAmount: Number,
  paidAmount: { type: Number, default: 0 },

  installments: [{
    amount: Number,
    dueDate: Date,
    status: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);
feeSchema.index({ studentId: 1 });
feeSchema.index({ feeType: 1 });
