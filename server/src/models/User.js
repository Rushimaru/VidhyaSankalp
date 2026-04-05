import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:      { type: String, required: true },
    role:          { type: String, enum: ['superadmin', 'admin', 'faculty', 'student'], default: 'admin' },
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', default: null },

    // OTP fields
    otp:       { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },

    // Profile
    phone:  { type: String },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;