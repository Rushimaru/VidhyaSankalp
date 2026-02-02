const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubscriptionPlan",
    required: true
  },

  startDate: Date,
  endDate: Date,

  status: {
    type: String,
    enum: ["ACTIVE", "EXPIRED", "GRACE"], 
    default: "ACTIVE"
  },

  autoRenew: Boolean,
  appliedCoupon: String
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);
