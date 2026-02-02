const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },

  amount: Number,
  gstAmount: Number,
  totalAmount: Number,

  gateway: { type: String, enum: ["Razorpay", "Stripe"] },
  transactionId: String,

  status: {
    type: String,
    enum: ["SUCCESS", "FAILED", "REFUNDED"]
  },

  invoiceUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
paymentSchema.index({ institutionId: 1, createdAt: -1 });
paymentSchema.index({ transactionId: 1 });
