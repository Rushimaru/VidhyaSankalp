import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, enum: ['Basic', 'Pro'], unique: true },
    price:       { type: Number, required: true }, // monthly price in INR
    maxStudents: { type: Number, required: true },
    maxFaculty:  { type: Number, required: true },
    features:    [{ type: String }],
    isActive:    { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true }
);

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
export default SubscriptionPlan;
