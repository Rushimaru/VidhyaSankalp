const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    default: null // Super Admin
  },

  role: {
    type: String,
    enum: ["SUPER_ADMIN", "ADMIN", "FACULTY", "STUDENT", "PARENT"],
    required: true
  },

  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,

  passwordHash: { type: String, required: true },

  is2FAEnabled: { type: Boolean, default: false },
  twoFASecret: String,

  status: {
    type: String,
    enum: ["ACTIVE", "SUSPENDED"],
    default: "ACTIVE"
  },

  lastLoginAt: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
userSchema.index({ email: 1 });
userSchema.index({ institutionId: 1, role: 1 });
userSchema.index({ deletedAt: 1 });