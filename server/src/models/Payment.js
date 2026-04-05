import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    institution:      { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    subscriptionPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    amount:           { type: Number, required: true },
    paymentDate:      { type: Date },
    dueDate:          { type: Date, required: true },
    status:           { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
    paymentMode:      { type: String, enum: ['cash', 'cheque', 'bank_transfer', 'upi', 'other'], default: 'bank_transfer' },
    transactionRef:   { type: String },
    notes:            { type: String },
    recordedBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
