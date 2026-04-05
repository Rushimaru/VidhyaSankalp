import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    code:     { type: String, required: true, unique: true, uppercase: true, trim: true },
    type:     { type: String, enum: ['School', 'College', 'Other'], default: 'School' },
    address:  { type: String, required: true },
    city:     { type: String },
    state:    { type: String },
    pincode:  { type: String },
    phone:    { type: String, required: true },
    email:    { type: String, required: true, lowercase: true },
    website:  { type: String },
    logo:     { type: String },

    // Admin user of this institution
    adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Subscription
    subscriptionPlan:   { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    subscriptionExpiry: { type: Date },
    subscriptionStatus: { type: String, enum: ['active', 'expired', 'trial'], default: 'trial' },

    isActive: { type: Boolean, default: true },
    notes:    { type: String },
  },
  { timestamps: true }
);

const Institution = mongoose.model('Institution', institutionSchema);
export default Institution;
