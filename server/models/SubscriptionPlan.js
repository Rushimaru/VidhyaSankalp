const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema({
  name: String,
  priceMonthly: Number,

  studentLimit: Number,
  facultyLimit: Number,
  storageLimitGB: Number,

  features: {
    attendance: Boolean,
    liveClasses: Boolean,
    onlineTests: Boolean,
    library: Boolean,
    hostel: Boolean,
    transport: Boolean,
    payroll: Boolean,
    parentLogin: Boolean,
    whiteLabel: Boolean
  }
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
