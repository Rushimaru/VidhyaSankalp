import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
    student:      { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    feeType:      { type: String, required: true }, // e.g. "Tuition", "Transport", "Hostel"
    amount:       { type: Number, required: true },
    discount:     { type: Number, default: 0 },
    netAmount:    { type: Number, required: true },
    dueDate:      { type: Date, required: true },
    paidAmount:   { type: Number, default: 0 },
    paidDate:     { type: Date },
    status:       { type: String, enum: ['pending', 'partial', 'paid', 'overdue'], default: 'pending' },
    paymentMode:  { type: String, enum: ['cash', 'cheque', 'upi', 'bank_transfer', 'other'] },
    receiptNo:    { type: String },
    remarks:      { type: String },
    collectedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
