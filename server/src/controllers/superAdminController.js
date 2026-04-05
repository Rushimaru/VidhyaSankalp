import User from '../models/User.js';
import Institution from '../models/Institution.js';
import SubscriptionPlan from '../models/SubscriptionPlan.js';
import Payment from '../models/Payment.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import { sendWelcomeEmail } from '../utils/emailService.js';

// ── GET /api/super-admin/stats
export const getStats = async (req, res) => {
  try {
    const [totalInstitutions, activeInstitutions, totalStudents, totalTeachers, payments] = await Promise.all([
      Institution.countDocuments(),
      Institution.countDocuments({ isActive: true }),
      Student.countDocuments(),
      Teacher.countDocuments(),
      Payment.find({ status: 'paid' }).select('amount'),
    ]);
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const expiringIn7Days = await Institution.countDocuments({
      subscriptionExpiry: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), $gte: new Date() },
    });
    res.json({ totalInstitutions, activeInstitutions, totalStudents, totalTeachers, totalRevenue, expiringIn7Days });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/super-admin/institutions
export const listInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find()
      .populate('subscriptionPlan', 'name price')
      .populate('adminUser', 'name email')
      .sort('-createdAt');
    res.json(institutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/super-admin/institutions/:id
export const getInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id)
      .populate('subscriptionPlan')
      .populate('adminUser', 'name email phone');
    if (!institution) return res.status(404).json({ message: 'Institution not found.' });
    const payments = await Payment.find({ institution: req.params.id }).sort('-createdAt');
    res.json({ institution, payments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/super-admin/institutions
export const createInstitution = async (req, res) => {
  const { name, code, type, address, city, state, pincode, phone, email, website,
          adminName, adminEmail, adminPassword, subscriptionPlanId, subscriptionExpiry } = req.body;
  try {
    if (!name || !code || !address || !phone || !email || !adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }
    const exists = await Institution.findOne({ code: code.toUpperCase() });
    if (exists) return res.status(400).json({ message: 'Institution code already in use.' });

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) return res.status(400).json({ message: 'Admin email already registered.' });

    // Create admin user
    const adminUser = await User.create({
      name: adminName, email: adminEmail, password: adminPassword,
      role: 'admin', isVerified: true,
    });

    // Create institution
    const institution = await Institution.create({
      name, code: code.toUpperCase(), type, address, city, state, pincode,
      phone, email, website, adminUser: adminUser._id,
      subscriptionPlan: subscriptionPlanId || null,
      subscriptionExpiry: subscriptionExpiry || null,
      subscriptionStatus: subscriptionExpiry ? 'active' : 'trial',
    });

    adminUser.institutionId = institution._id;
    await adminUser.save();

    await sendWelcomeEmail({ to: adminEmail, name: adminName, role: 'Admin', password: adminPassword, institutionName: name });
    res.status(201).json({ institution, adminUser: { _id: adminUser._id, name: adminUser.name, email: adminUser.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── PUT /api/super-admin/institutions/:id
export const updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!institution) return res.status(404).json({ message: 'Institution not found.' });
    res.json(institution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── PATCH /api/super-admin/institutions/:id/toggle
export const toggleInstitutionStatus = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: 'Institution not found.' });
    institution.isActive = !institution.isActive;
    await institution.save();
    // Also toggle admin user
    await User.updateOne({ _id: institution.adminUser }, { isActive: institution.isActive });
    res.json({ isActive: institution.isActive, message: `Institution ${institution.isActive ? 'activated' : 'deactivated'}.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/super-admin/payments
export const listPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('institution', 'name code')
      .populate('subscriptionPlan', 'name')
      .populate('recordedBy', 'name')
      .sort('-createdAt');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/super-admin/payments
export const recordPayment = async (req, res) => {
  try {
    const payment = await Payment.create({ ...req.body, recordedBy: req.user._id });
    if (req.body.status === 'paid' && req.body.institution) {
      await Institution.findByIdAndUpdate(req.body.institution, {
        subscriptionStatus: 'active',
        subscriptionExpiry: req.body.dueDate,
        subscriptionPlan: req.body.subscriptionPlan,
      });
    }
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── PUT /api/super-admin/payments/:id
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found.' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/super-admin/plans
export const listPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().sort('price');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── PUT /api/super-admin/plans/:id
export const upsertPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true, runValidators: true });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/super-admin/plans
export const createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
