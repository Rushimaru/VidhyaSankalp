import Fee from '../models/Fee.js';

// ── GET /api/fees
export const listFees = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId };
    if (req.query.student) filter.student = req.query.student;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;
    const fees = await Fee.find(filter)
      .populate('student', 'fullName admissionNo classSection section')
      .populate('academicYear', 'name')
      .sort('-dueDate');
    res.json(fees);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── POST /api/fees
export const createFee = async (req, res) => {
  try {
    const { student, academicYear, feeType, amount, discount = 0, dueDate } = req.body;
    if (!student || !academicYear || !feeType || !amount || !dueDate) {
      return res.status(400).json({ message: 'student, academicYear, feeType, amount, dueDate required.' });
    }
    const netAmount = amount - discount;
    const fee = await Fee.create({
      institution: req.user.institutionId, student, academicYear,
      feeType, amount, discount, netAmount, dueDate,
    });
    res.status(201).json(fee);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── PUT /api/fees/:id/collect  (record payment)
export const collectFee = async (req, res) => {
  try {
    const { paidAmount, paymentMode, receiptNo, remarks, paidDate } = req.body;
    const fee = await Fee.findOne({ _id: req.params.id, institution: req.user.institutionId });
    if (!fee) return res.status(404).json({ message: 'Fee record not found.' });

    fee.paidAmount = (fee.paidAmount || 0) + Number(paidAmount);
    fee.paymentMode = paymentMode;
    fee.receiptNo = receiptNo;
    fee.remarks = remarks;
    fee.paidDate = paidDate || new Date();
    fee.collectedBy = req.user._id;

    if (fee.paidAmount >= fee.netAmount) fee.status = 'paid';
    else if (fee.paidAmount > 0) fee.status = 'partial';

    await fee.save();
    res.json(fee);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── PUT /api/fees/:id
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findOneAndUpdate(
      { _id: req.params.id, institution: req.user.institutionId },
      req.body, { new: true }
    );
    if (!fee) return res.status(404).json({ message: 'Fee not found.' });
    res.json(fee);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── DELETE /api/fees/:id
export const deleteFee = async (req, res) => {
  try {
    await Fee.findOneAndDelete({ _id: req.params.id, institution: req.user.institutionId });
    res.json({ message: 'Fee record deleted.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── GET /api/fees/summary  (institution-wide)
export const feesSummary = async (req, res) => {
  try {
    const fees = await Fee.find({ institution: req.user.institutionId, academicYear: req.query.academicYear });
    const summary = fees.reduce((acc, f) => {
      acc.totalDue += f.netAmount;
      acc.totalCollected += f.paidAmount || 0;
      if (f.status === 'paid') acc.paid++;
      else if (f.status === 'partial') acc.partial++;
      else if (f.status === 'overdue') acc.overdue++;
      else acc.pending++;
      return acc;
    }, { totalDue: 0, totalCollected: 0, paid: 0, partial: 0, pending: 0, overdue: 0 });
    summary.outstanding = summary.totalDue - summary.totalCollected;
    res.json(summary);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
